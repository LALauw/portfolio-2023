---
title: "Gamification of education using dynamic NFTs"
summary: "My graduation project at KOIOS: NFTs that change as students progress, with the metadata off-chain and the asset itself on-chain."
date: "2023-01-01"
context: "Graduation, KOIOS"
role: "Software Engineer & Graduate"
stack: ["Solidity", "TypeScript", "Node.js"]
color: "butter"
icon: "hex"
order: 2
---
The organization where I graduated at was [KOIOS](https://koios.world/). As a developer and web3 enthusiast I was determined to finish my study in software engineering with an assignment that focuses on web3 technology. During this time I developed an application that allows students to create their own dynamic NFT.

## Introduction

My graduation assignment was to develop gamification elements for the KOIOS platform that also incorporate web3 elements. What better way to do so with NFTs? To add more gamification elements I decided to make these NFTs dynamic. But how does one achieve dynamic NFTs? In this article I'll describe how I achieved the goal of dynamic NFTs.

## The Problem

There are 2 options for handling metadata:

- Off-chain metadata, this means that metadata is stored in a database
- On-chain metadata, this means that metadata is stored on the blockchain

The problem is that on-chain metadata is quite expensive, since storing data on a blockchain requires a lot of gas. Another problem to solve was that the dynamic NFTs should be non-transferable. This means that when a student receives an NFT, he or she is not allowed to send the NFT. KOIOS wanted this, because there should be no financial incentive attached to the NFTs.

## The Solution

I decided to store metadata off-chain, but to retain the assets itself on-chain. This means that you own the assets, but it is also possible to alter your own asset. I achieved this by requiring a digital signature. In *figure 1* below you can see how the request is flowing from component to component.

![evolve-sequence.png](/articles/gamification-of-education-using-dynamic-nfts/image-1.png)

*Figure 1: sequence diagram showing the flow of a request to evolve an NFT.*

Next up was solving the problem to make the NFTs non-transferable. Up until now there has not been a standard to achieve this, but I found a standard from [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/access-control) that gives the contract role-based access control. This means that we can achieve non-transferability by implementing roles into the contract.

First we need to implement the interface:

```solidity
contract EvolvingTitan is AccessControlEnumerable, ERC721Enumerable, Ownable, SignedTokenVerifier
```

We now have access to the functionalities that are available in the *AccessControlEnumerable* interface.

Next we define the role for authentication:

```solidity
bytes32 public constant TRANSFER_ROLE = keccak256("TRANSFER_ROLE");
```

Lastly we need to override the *_beforeTokenTranser* function that was inherited from the *ERC721Enumerable* interface. In the method we first check if the caller of the function is the burn address, this is because we still want the NFTs to be mintable. Next we check if the caller has the TRANSFER_ROLE, nobody has this role so it will always revert with the custom error.

```solidity
/**
     * @dev Overrides the _beforeTokenTransfer function from the inherited ERC721Enumerable contract.
     * Checks if the caller has the Transfer_ROLE or if the transfer is to the 0x0 address.
     * @param _from The address to transfer the token from.
     * @param _to The address to transfer the token to.
     * @param _tokenId The tokenID to transfer.
    */
    function _beforeTokenTransfer(address _from, address _to, uint256 _tokenId) internal virtual override(ERC721Enumerable){
        super._beforeTokenTransfer(_from, _to, _tokenId);
        if(_from == address(0) || hasRole(TRANSFER_ROLE,  _msgSender())){
            return;
        }
        revert PermissionDeniedCallerIsNotATransferrer(_msgSender());
    }
```

## The result

At the end of my graduation assignment I achieved dynamic NFTs and it is in production at [nfts.koios.world](https://nfts.koios.world). All creations from students can be found [here](https://nfts.koios.world/titans).
