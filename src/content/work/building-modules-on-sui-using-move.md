---
title: "Building modules on Sui using Move"
summary: "What I learned moving NFTs from Solana to Sui at Lucky Kat, with a small Move example."
date: "2023-07-02"
context: "Lucky Kat Studios"
role: "Web3 Developer"
stack: ["Move", "Sui", "TypeScript"]
color: "sky"
icon: "drop"
order: 1
---
Over the past few months, I have had the opportunity to work at Lucky Kat Studios, where my primary responsibility was to facilitate the migration of Solana-based non-fungible tokens (NFTs) to the Sui Blockchain. This undertaking posed a significant challenge as Sui is a recently launched blockchain, making it a novel and uncharted territory. Throughout my tenure, I have gained invaluable experience and knowledge, particularly in acquainting myself with Move, a wholly new programming language that accompanies the Sui Blockchain. In this article I will explain Sui and Move by providing a simple coding example.

## The Move Programming Language

The Move programming language emerged as a result of Facebook's Libra project, now known as Diem. Move was developed to serve as the programming language for the Diem blockchain, with a focus on providing a secure and reliable environment for financial transactions. It was designed to address the unique challenges faced by blockchain platforms, particularly the need for safety and security in smart contracts.

Move introduces innovative features such as a resource-oriented programming model and a powerful type system. The language enforces strict rules for resource ownership and access control, ensuring that digital assets are handled securely and transparently. Move's type system provides strong guarantees of correctness, reducing the risk of programming errors and vulnerabilities.

Since its inception, Move has gained recognition beyond the Diem project and has attracted interest from the broader blockchain community. Its potential applications extend beyond financial transactions, making it a versatile language for building decentralized applications. As Move continues to evolve, it holds promise for enabling secure and trustworthy blockchain solutions.

## The Sui Blockchain

Sui stands out among blockchain platforms with its distinct object-centric design, setting it apart from traditional blockchains like Ethereum. Unlike Ethereum's account-based model, Sui adopts an object-oriented approach, which offers several advantages.

Sui's object-centric design provides a more flexible and intuitive framework for managing assets and data on the blockchain. Instead of relying solely on smart contracts, Sui allows developers to define and interact with objects directly. This approach enables finer-grained control over asset ownership and access, enhancing security and transparency.

Furthermore, Sui's object-centric design allows for more efficient and modular development. Developers can create reusable object templates and define relationships between objects, simplifying the creation and management of complex decentralized applications. This design also facilitates easier upgrades and modifications to the blockchain, as changes can be made at the object level without disrupting the entire system.

By embracing an object-centric design, Sui offers a fresh and innovative perspective on blockchain architecture. This approach provides developers with greater flexibility, modularity, and control over assets and data, enabling them to build sophisticated and scalable decentralized applications with ease. Sui's object-centric model marks a significant departure from the account-based systems of other blockchains and contributes to its unique value proposition in the blockchain ecosystem.

## A practical example

Let's develop a simple game where we have 2 objects, I won't go into the setup since this has been documented quite well by Sui itself:

- A hero which the player controls
- A monster which the admin controls

Each object, i.e. a **`Hero`** or a **`Monster`,** can be defined as a so-called struct. We want the hero to have the following properties:

- Name
- Level
- Health
- Damage
- Alive

The **`Monster`** will also have the same properties.

After adding the structs the module will look as follows:

```move
module heroRpg::hero {
    use std::string::{String};

    struct Hero has key, store {
        id: UID,
        name: String,
        level: u64,
        health: u64,
        damage: u64,
        alive: bool,
    }

    struct Monster has key, store {
        id: UID,
        name: String,
        level: u64,
        health: u64,
        damage: u64,
        alive: bool,
    }
}
```

Sui also offers a specific function that will run when the module gets deployed, a so-called init function. The init function runs only once when the module gets deployed. Let's create a hero and a monster when we deploy the module.

```move
fun init(ctx: &mut tx_context::TxContext) {
        let creator = tx_context::sender(ctx);
        
        let initial_hero = Hero {
            id: object::new(ctx),
            name: string::utf8(b"Initial Hero"),
            level: 1,
            health: 100,
            damage: 10,
            alive: true,
        };

        let initial_monster = Monster {
            id: object::new(ctx),
            name: string::utf8(b"Initial Monster"),
            level: 1,
            health: 10,
            damage: 10,
            alive: true,
        };

        transfer::public_transfer(initial_hero, creator);
        transfer::share_object(initial_monster);
}
```

We can see that we created a **`Hero`** with 100 HP and 10 damage. We also see that the **`Monster`** has 10 HP and 10 damage. The last part is transferring the created objects to the creator. What is different from the monster is that monsters are shared objects. This is another concept by Sui.

Shared objects aren't owned by anyone and can be read by anyone. Using the module where the shared object stems from we can write functions to access and alter the shared object. In the case of the **`Monster`** we want that any **`Hero`** can attack it, but only if its level is equal or higher than the **`Monster`** and that both objects are alive. Let's implement this.

```move
public entry fun attack_monster(
        hero: &mut Hero, 
        monster: &mut Monster
    ) {
        assert!(hero.alive, EHeroIsDead);
        assert!(monster.alive, EMonsterIsDead);
        assert!(hero.level >= monster.level, EHeroIsUnderleveled);

        // Attack the monster
        monster.health = monster.health - hero.damage;
        hero.health = hero.health - monster.damage;

        // Check if the monster is dead
        if (monster.health <= 0) {
            monster.alive = false;
        };

        // Check if the hero is dead
        if (hero.health <= 0) {
            hero.alive = false;
        } else {
            hero.level = hero.level + 1;
        }
}
```

We can see that we created a function called: **`attack_monster`**. The function requires a few parameters:

- A mutable reference of the Hero that attacks the monster
- A mutable reference of the Monster that is getting attacked

When we fist enter the function we do a few checks:

- Make sure the hero and monster are still alive
- Make sure that the hero is the same or a higher level than the monster

If all checks are passed then we attack the **`Monster`** with our **`Hero`**. The last part is checking whether the **`Monster`** and the **`Hero`** have survived. If not we alter their alive status. In the future we can create potions to revive our **`Hero`**, but that story is for another time 😉.

This works! Quite easy, huh? But there's one critical part missing...

Unit Tests!!!!

It is very important to test your code before you deploy it on the blockchain, this is because blockchain modules are immutable. Once deployed it is deployed forever. If there is one mistake or exploit, it will stay there forever. So it is very important to atleast write some tests. 

Let's test our code!

First we need to test if we have correctly initialized our module, we do this with a so-called **`test_init_func`** we wrote ourselves.

```move
#[test_only]
module heroRpg::test_attacking {
    use sui::test_scenario::{Self, ctx};

    use heroRpg::hero::{Hero};
    
    const CREATOR: address = @0xCAFE;

    #[test]
    fun test_init_func() {
        let scenario = test_scenario::begin(CREATOR);
        let ctx = ctx(&mut scenario);
        heroRpg::hero::test_init(ctx);

        test_scenario::next_tx(&mut scenario, CREATOR);

        let hero = test_scenario::take_from_address<Hero>(&mut scenario, CREATOR);

        test_scenario::return_to_address(CREATOR, hero);
        test_scenario::end(scenario);
    }
}
```

When we run this test it will successfully pass. Let's take a look at how we are testing an attacking scenario!

```move
#[test]
fun test_attack_monster(){
    let scenario = test_scenario::begin(CREATOR);
    let ctx = ctx(&mut scenario);
    heroRpg::hero::test_init(ctx);

    test_scenario::next_tx(&mut scenario, CREATOR);

    let hero = test_scenario::take_from_address<Hero>(&mut scenario, CREATOR);
    let monster = test_scenario::take_shared<Monster>(&mut scenario);

    std::debug::print(&hero);
    std::debug::print(&monster);

    test_scenario::next_tx(&mut scenario, CREATOR);

    heroRpg::hero::attack_monster(&mut hero, &mut monster);

    std::debug::print(&hero);
    std::debug::print(&monster);

    test_scenario::return_to_address(CREATOR, hero);
    test_scenario::return_shared(monster);
    test_scenario::end(scenario);
}
```

This function follows the same first parts of the init test, initializing the module. Next we are taking specific objects from our scenario, namely the **`Hero`** object from the **`CREATOR`** and the shared **`Monster`** object. This allows us to utilize these objects within our scenario. We then simulate the **`next_tx`** from this scenario to be called by the **`CREATOR`.** The following transaction will be to attack the monster using **`attack_monster`** and passing in the correct mutable references. 

What Sui also offers is debugging. During tests we can print out certain objects in the console to see what their values are, I have added a console log before and after we attack the monster. When we run the function we can see the following logs:

```move
Running Move unit tests
[debug] 0x0::hero::Hero {
  id: 0x2::object::UID {
    id: 0x2::object::ID {
      bytes: @0x34401905bebdf8c04f3cd5f04f442a39372c8dc321c29edfb4f9cb30b23ab96
    }
  },
  name: "Initial Hero",
  level: 1,
  health: 100,
  damage: 10,
  alive: true
}
[debug] 0x0::hero::Monster {
  id: 0x2::object::UID {
    id: 0x2::object::ID {
      bytes: @0xa4137e2ed945e7f4e8c307001c32e97472fb3eebb8f7b4ab7534b447d22da89b
    }
  },
  name: "Initial Monster",
  level: 1,
  health: 10,
  damage: 10,
  alive: true
}

[debug] 0x0::hero::Hero {
  id: 0x2::object::UID {
    id: 0x2::object::ID {
      bytes: @0x34401905bebdf8c04f3cd5f04f442a39372c8dc321c29edfb4f9cb30b23ab96
    }
  },
  name: "Initial Hero",
  level: 2,
  health: 90,
  damage: 10,
  alive: true
}
[debug] 0x0::hero::Monster {
  id: 0x2::object::UID {
    id: 0x2::object::ID {
      bytes: @0xa4137e2ed945e7f4e8c307001c32e97472fb3eebb8f7b4ab7534b447d22da89b
    }
  },
  name: "Initial Monster",
  level: 1,
  health: 0,
  damage: 10,
  alive: false
}
[ PASS    ] 0x0::test_attacking::test_attack_monster
[ PASS    ] 0x0::test_attacking::test_init_func
Test result: OK. Total tests: 2; passed: 2; failed: 0
```

From the logs we can see that the **`Monster`** died because its health fell to 0 and our **`Hero`** lost 10 HP. We can correctly see that we've attacked the **`Monster`**. This is one example of how to test a function, we can come up with numerous other cases to full test our code. But I'll leave it as this. 

I hope you've enjoyed reading this initial Sui example project!
