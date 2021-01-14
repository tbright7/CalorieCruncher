# Calorie Cruncher
The Calorie Cruncher removes a lot of guess work regarding nutrition. It accepts a users height, age, weight, gender, goal weight, and activity level, and returns an approximate daily caloric need. Additionally, the Calorie Cruncher breaks down the macrontrients based upon your goal weight and current weight. Lastly, the Calorie Cruncher allows users to update and track their weight not only to provide the most accurate recommended calorie count, but also as a way for users to measure their progress.

## Motivation
I wanted to build this app as a way for users to understand the caloric breakdown of their foods. I noticed a lot of friends and family don't understand how much fat is actually in the things they consume, nor do they know how much fat, protein, and carbohydrates they should be consuming. Eventually, I would like for this app to also render micronutrient information, however, that information can be problematic due to consistency of nutrients.

### Screenshots
**Home Screen**
![Alt text](/Screen%20Shot%202021-01-04%20at%205.29.15%20PM.png?raw=true "Home Screen")
**User Dashboard**
![Alt text](/Screen%20Shot%202021-01-04%20at%205.29.43%20PM.png?raw=true "User Dashboarde")

#### Installation
npm install  
Obtain API key from https://spoonacular.com/food-api  
Fill in API on /client/src/components/CurrentUserInfo.jsx line 26  
npm run build  
npm start  

##### License
ISC @ Travis Bright
