# Trello Clone

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Steps to serve the project locally

- Clone the repository
- Run command `npm start`

### What I did before coding

* Thinking about the pages and the possible routes
* Prepared an on-paper prototype for all pages
* Create a dummy data structure
* Thinking about the contexts and how to manage states
* Find an easy-to-use CSS utils library

I had below notes as the result of the above steps:

```
Entities:
- User
    - Full Name
    - Username
    - Email
- WorkSpace
    - Title
    - Description
    - Key
    - Username
- Board
    - Title
    - Key
    - Background
    - WorkspaceKey
    - Columns []
- Column
    - Title
    - Key
    - Order
- Card
    - Key
    - Title
    - Content
    - BoardKey
    - ColumnKey
    - Checklist
    - Members []
    - Labels []
- Label
    - Key
    - Title
    - Color


Pages:
- Login (/login)
- User Profile and settings (/profile)
    - User details (name, avatar, email, logout)
- Workspaces (/)
    - List All Workspaces
    - Create new Workspace
        - Name
        - Description
        - Key
- Workspace Details (/w/:key)
    - List of boards
    - Create new board
        - Title
        - Workspace
        - Background
        - Key 
    - 
- Board Details (/b:key)
    - Columns
        - Title
        - Key
        - Position
        - Add card to column
            - New card simple form
    - Add new Column
    - Card Modal
        - Title
        - Description
        - Members
        - Checklist
        - Labels
        - Move/copy to another board

Common Components:
- Input
- Button
- Modal
- Select
- Header

Steps:
1. Create react app
2. Create dummy data
3. Create directory structure with my common way
    src
        components
        constants
        utils
4. Import Basic Styles
5. Create jsx file for each page
6. Create router (without react-router)
7. Create pages base components
8. ...

Resources and APIs:
- https://watercss.kognise.dev/ Common Style
- https://basscss.com  CSS Utils

```

As you would see I started from workspace entity. Each user could have various workspaces. Also, each workspace could
include dozens of boards. It's possible to add multiple columns to each board and multiple cards to each column.

During all 4-5 hours I focused on functionality more than performance.

I tried to implement routing with a context.

To simplify and save time, I've made all the data service stuff inside the data context.

No time left for checklist and label creation.

**If this was a real product:**

- I would focus equally on performance and functionality
- In-code comment and prop types are required 
- Data services should handle in a separate place
- Some features like card activities, adding comments, reach text editor are needed to make the app more useful


:) 