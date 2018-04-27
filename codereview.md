### Congratulations on completing your final project for wdi43!

Hi Marcellino, nice job on turning your first project into a full website with user profiles. You've used a lot of interesting technologies here, which is very cool to see, but there are some issues with MVP functionality as it currently stands. I'd love to see you polish this up in terms of design and functionality!

Here are some notes on your code and suggestions for you to look into.

### Front end:

- There are some issues with styling that impede usability. I recommend reaching out to a UXDI student to get some feedback as well!
  - For example, the homepage signup form is on a black background, and input text is also black so it's invisible as you are typing.
- Replace the "Logo" placeholder in header with an actual logo.
- Consider the user state in your header options: should the logged-in user be able to go "home" where they can fill out another signup page?
- Since you have an About page, please fill it in with app-related text.
- On the game page, please have relevant text instead of your "something else" placeholder text.
- Please take a moment to create a cohesive color scheme. Right now the site is using standard materialize defaults.
-  Since you have a settings button, please ensure it has functionality to update user details such as email.
- The pinterest avatar picker is cool! Can you enable users to choose an avatar that is outside the basic profiles?
- On my local clone as well as on heroku, the game creation stalls on waiting for an opponent.
- I like how you explored using Pug templates, nice job. Your footer looks like it was not included, as it's not cohesive with the design, so I'd recommend turning it from a blank white bar to something more relevant.
- Unfortunately, since I can't play a game, I can't analyze the other graphs. However, there is NaN-NaN-NaN on the bottom left of the progress graph.
- Good use of flash error messages, sometimes they can be laggy though.

### Back end:
- There is an issue when I hit the profile page on my local clone; I see the server error `db.User.deepPopulate is not a function`. Searching your project, it doesn't look like you've 'required' the mongoose-deep-populate package even though it's installed and used in the `userController`.
- Go ahead and complete your full CRUD functionality by finishing your user update and delete methods in your user controller. You've got it started :)
- Please remove all unused/commented out code (see user controller, game controller, game model, chess-lib-new.js, etc)
- When you are writing comments, I'd like you to think about writing them for people who are completely unfamiliar with your work. How can you describe what's going on? It is good teamwork practice to think of others interacting with your code (and future you who might need a little memory help).

You've taken your final project pretty far in a week, and I know it can become a lot more polished if you address some of these issues. You have the skills, and with a little more work it will be an amazing game! I'd love to see you grow your design skills and attention to detail on this and future projects!

Let me know if you have any questions about this feedback!
-Stephanie