
## Tech Stack

**Client:** React, CSS , HTML

**Server:** Python, FastAPI, MongoDB

## 
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


`MONGO_PWD = your db password` 

`MONGO_USER = your user ` 

`SECRET_KEY = a ssh key or key`

`ALGORITHM = a sequence of number,letter and symbols`

`ACCESS_TOKEN_EXPIRES_MINUTES = a number` 

## Run Locally

Clone the project

```bash
  git clone https://github.com/zyperr/fullstack-anime-page.git
```

Go to the project directory

```bash
  cd fullstack-anime-page
```



## Installation


##### Frontend dependencies 
```bash
  cd .\client\
  npm install
```
#### Backend dependencies
 
Make sure to create a Virtual Environments before installing packages

```bash
    cd .\backend\
    python -m venv env
```
*Windows*
```bash
    \fullstack-anime-page\backend> .\env\Scripts\activate
```
*Linux*

```bash
    source env/bin/activate
```
*install packages*
```bash
    pip install -r requirements.txt
```
# fullstack-anime-page

#### 👽 User
An anime page *(yes another)* where you can visualize animes,mangas and manhwas with their synopsis, number of episodes and if they've had finished or have not.

You can register or sign in.If you have succefully create and sign in then you can customize your profile banner and avatar moreover you're able to modify your password or delete your account.

Of course if you like to add some animes as favorites you could do this only if you've had succefully sign in.

#### 🔒 Admin 

Admin can will be able to modify an existing anime/manga or manhwa,certainly Admin have their own page for this and it only can be accessed if you're and administrador besides they can create animes/mangas and manhwas.
## 💻 Frontend
## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Backgrounds | ![#303030](https://via.placeholder.com/10/303030?text=+) #303030 |
| Text - Hover - Backgrounds items | ![#afa2ff](https://via.placeholder.com/10/afa2ff?text=+) #afa2ff |
| Details | ![#f6e528](https://via.placeholder.com/10/f6e528?text=+) #f6e528 |
| Background - Text  | ![#EAFDF8](https://via.placeholder.com/10/EAFDF8?text=+) #EAFDF8 |
| Details for Text  | ![#bb93eb](https://via.placeholder.com/10/bb93eb?text=+) #bb93eb |


### Screenshots

#### Home

![Home Page](https://cdn.discordapp.com/attachments/1208364888599175211/1220509509051617350/image.png?ex=660f330e&is=65fcbe0e&hm=c4884d4fa28eb3837aed92f16abb9785f77cd442c686b98263aa6a4a987d1ee0&)

![Home Page](https://cdn.discordapp.com/attachments/1208364888599175211/1220509011468619816/image.png?ex=660f3298&is=65fcbd98&hm=de2fb8d3a0ac9c0e0161f90b9afb1c0f875a87e80679a969be43f7035522f0af&)

![Home Page](https://cdn.discordapp.com/attachments/1208364888599175211/1220509270324416572/image.png?ex=660f32d6&is=65fcbdd6&hm=ee0184ab5e6af713b491ac08b9834c17d6ba0dace3e401c9cf723ee2c982e7e2&)

#### Login 

![Login Page](https://cdn.discordapp.com/attachments/1208364888599175211/1220510513050423380/image.png?ex=660f33fe&is=65fcbefe&hm=8382068481ab2f1ec24deeb964d45808ad718899539c030cc13ed3b9b4a3d014&)

#### Register

![Login Page](https://cdn.discordapp.com/attachments/1208364888599175211/1220781019360264303/image.png?ex=66102fec&is=65fdbaec&hm=139e2ce16395427d01bf7f4f3986a5f4a4bf687b59b8910dc9b3e158dc910c27&)

#### Details

![Change profile banner](https://cdn.discordapp.com/attachments/1208364888599175211/1221556011954081985/image.png?ex=661301b0&is=66008cb0&hm=34c1939c4dfa1039e7f7d3664a6b734b9cf8172ebb36295ef40111155c90c7d4&)

#### home log in 

![Header log in](https://cdn.discordapp.com/attachments/1208364888599175211/1221551474379718766/image.png?ex=6612fd76&is=66008876&hm=03fcdb6e12cedcdc10b7c95c77ef7aa1e482cd4112169571f17ece0820ed431e&)

#### Profile

![Profile page](https://cdn.discordapp.com/attachments/1208364888599175211/1221551835291193397/image.png?ex=6612fdcc&is=660088cc&hm=5fca2636102a6b58454091a466258e129615fc91ec7e1967be74f9d1480d9ec9&)

#### Change profile banner

![Change profile banner](https://cdn.discordapp.com/attachments/1208364888599175211/1221552205031669943/image.png?ex=6612fe25&is=66008925&hm=8a53e0bcaece87b98cb6cdb34fbe695b1eed27b3aa6517b3473aa9ad4e4bb9f3&)

#### Change password and delete
 
![Change profile banner](https://cdn.discordapp.com/attachments/1208364888599175211/1221552632640962640/image.png?ex=6612fe8a&is=6600898a&hm=6ed56fa74de5dc560ab59a327fc62f432a8555fcfcce510d1d113268f4c0ab69&)

#### Favorites
 
![Change profile banner](https://cdn.discordapp.com/attachments/1208364888599175211/1221556352371916870/image.png?ex=66130201&is=66008d01&hm=f401b3dea006fa9cf0a4921b1d3415b5254ddd0f6b90cd2d9ae6a2711d575dc1&)


### 🔒 Admin

![Admin table](https://cdn.discordapp.com/attachments/1208364888599175211/1221556594186260531/image.png?ex=6613023b&is=66008d3b&hm=d089d1b921236049397e766be0d4c761b1e074bb62ef0e2f48fbe9006a81cd72&)

##### Edit form

![Edit anime page](https://cdn.discordapp.com/attachments/1208364888599175211/1221556839574147183/image.png?ex=66130275&is=66008d75&hm=7240e6e438e4d4c3596f9e621812f9afbacda8860fae2c481509dc4d3d01b2c2&)

##### Create form

![Edit anime page](https://cdn.discordapp.com/attachments/1208364888599175211/1221557044331413554/image.png?ex=661302a6&is=66008da6&hm=de8d3a32143ae2ef7ebd35a513ff341744422798acf383b7da92dae2762079ab&)

![Edit anime page](https://cdn.discordapp.com/attachments/1208364888599175211/1221557338259849246/image.png?ex=661302ec&is=66008dec&hm=4ad164fa57734885127a27c237b0e881e493556c62f7631326f4f5fd8f56b798&)
## Authors

- [@zyperr](https://github.com/zyperr)
- [@Irumau](https://github.com/Irumau)

