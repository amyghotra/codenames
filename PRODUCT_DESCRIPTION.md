# Product Description: Codenames Web Application 
**Team Fluffy Turtles**

September 7, 2021

## Group Members:
- Stephanie Bravo
- Daniel Rizzo
- Michael Tse
- Kevin Xie
- Amy Ghotra

## Wireframes
Figma file [here](https://www.figma.com/file/R78tXWoVIj3EFh37z35Bg3/Codenames-Wireframe?node-id=0%3A1)

## Introduction
Our project is a web application version of the card game Codenames. 
In this game, there are two teams, Red and Blue, each of which has two types of players: Spymasters and Operatives.
There are also a set of cards with words on them. Some of the cards are associated with the Red team, others to the Blue team, 
some aren't associated with either ("Bystanders"; neutral cards), and there is a single Assassain card.
Spymasters are aware of the classifications of the cards, while Operatives do not. The Spymaster must provide their Operatives with a single-word clue,
when it is their team's turn, that will help their teammember identify a card associated with their respective team.
The first team to get all of their cards wins. A team can also win if the opposing team player chose the Assassain card when it was their turn.


## Features and Information
Upon landing on our site the user will be presented with three options:
1. Create new game room
2. Join existing game room (by prodiving a game room code)
3. Get help/information on how the game is played

Following this users will be prompted to pick a screen name, team (red or blue), and role (spymaster or operative). After this the user is added to a game room.

Once there are enough players in the game room, the round will commence. The computer will randomly generate a set of 25 cards from a much larger set of words, and then determine which team will play first. 

The Spymaster sees a grid with 25 cards on it. The cards are color-coded based on classification / who they bleong to. This allows the Spymaster to correcty identify their team's card and give relevant/correct clues.

Operatives see a grid of 25 neutral-colored cards. They do not know the classification of any of the cards until they or someone else takes a guess and the card classifications are revealed.

The Spymaster of the chosen team will provide the Operative from their team with a single-word clue to help them figure out which card belongs to their team. The Spymaster can also specify the number of cards their clue applies to-- this is also the number of guesses that a player is allowed, and if this is 0 or infinity, it means the player has an unlimited number of guesses.

After Operatves receive a clue, Operatives select a certain number of cards from the set which they think correlate to the given clue-- they can also select cards which they think they missed in previous rounds (if they have guesses available).

If an Operative guesses correctly, they can guess again, but must do so without a clue. They can also choose to pass their turn.

If an Operative selects a Bystander, nothing happens. 

If an Operative selects another team's card, that card is revealed for the other team, and the curren team's turn passes.

If an Operative selects the Assassain card, the game ends and the opposing team wins. 




## Test Plan:
### Intro
The objective of this project is to create a functional web application which imitates the card game Codenames.


### Scope:
This project is a full-stack web application. Its development will entail a frontend, backend, and a database. The different components of the application will be built using React, Django, CSS (Bootstrap), and PostgreSQL. 

The group has decided that we would each like to work with new technologies for the project. Some of us have experience with technologies that others have not worked with, so we will collab and hop on calls in order to relay knowledge and ensure productivity.


### Test Strategy:
The frontend can be testing locally from any device as long as the person has the source code.

This will not entirely be the case for the backend. Although the teammembers who are working on the backend will be able to make requests locally, they cannot share a database unless it is hosted somewhere. We will look into potentially hosting it on DigitalOcean so that all of us can generate data and work with the same data. 


### Environment Requirements and Tools
Laptop, some sort of code editory, Node.js, Postman or Insomnia


### Test Schedule: 

| Dates      | Description |
| ----------- | ----------- |
| 09/13      | Learning and basic setup <br /> Get the basics of the frontend and backend setup (React, Djando, SQL)       |
| 09/20   | FRONTEND: Learning and Start implementing the frontend/UI of the application (landing page, connecting buttons, user info page<br />BACKEND: get familiar with Django syntax and create + normalize DB tables |
| 09/27   | FRONTEND: Start implementing the frontend/UI of the application (landing page, connecting buttons, user info page (cont.) <br /> BACKEND: start creating object models and start implementing the tables       |
| 10/04   | FRONTEND: Implementation of UI for actual game (cards, point keeping, etc.)<br /> BACKEND: Cont. work on obj models; Host backend somewhere (maybe DigitalOcean)      |
| 10/18   | Make frontend interactive and make it seem as though it is actually playable <br /> Stretch Goal: Fully connect frontend and backend     |
| 10/25   | Finish MVP <br /> work on MVP Presentation <br /> Update / Troubleshoot / Fix bugs        |
| 11/01   | MVP Presentation Day       |
| 11/08   | Connect frontend and backend       |
| 11/15   | Connect frontend and backend <br /> Make UI changes to make game look more presentable       |
| 11/22    | Text        |
| 11/29   | Text        |
| 12/06    | Text        |
| 12/13   | Finished product / Final presentation       |


### Control Procedures
- Code reviews
- Keep group updated on current status
- Group meetings


### Functions to be tested:
1. Creation of a game room
2. Ability to join game room using code
3. Store user display names and display them if/when necessary
4. Players should be able to select cards
5. Determine whether chosen cards are acceptable or not; i.e. determine score/game status after cards are chosen
6. Determine a winner


### Resources and Responsibilities
Resources
- Ourselves
- Internet
- Prof. Washburn

Responsibilities:
- Complete assigned tasks effectively and on time
- Have a working and presentable deliverable at the end


### Deliverable
Working interactive web application that allows users to play a game of Codenames


### Risks
- Schedule
- Technical risks
- Personal problems
- Environmental (hurricane/blizzard causing internet/power outage)

