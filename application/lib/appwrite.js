import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";

// Local Host
// export const config = {
//     endpoint : 'http://192.168.0.108/v1',
//     platform : 'com.jsm.aora',
//     projectId : '66e7d08000289ae865d1',
//     databaseId : '66e7d16400309837cf91',
//     userCollectionId : '66e7d1b600111dbb29c3',
//     videoCollectionId : '66e7d1c9002b16abdfe3',
//     storageId: '66e7d2e1003d90e32fa6'
// }

// Cloud Host
export const config = {
  endpoint : 'https://cloud.appwrite.io/v1',
  platform : 'com.jsm.aora',
  projectId : '66e68f5200103cc7a5ec',
  databaseId : '66e690e90017f746277f',
  userCollectionId : '66e69128002b91cdc04c',
  videoCollectionId : '66e691aa0010e56ae8e0',
  storageId: '66e69e5a000661f5dd03'
}

const {
  endpoint,
  platform,
  projectId, 
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config

const client = new Client();

client 
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export async function createUser(email, password, username) {
    try {
        const newAccount = await account.create(
          ID.unique(),
          email,
          password,
          username
        );
    
        if (!newAccount) throw Error;
    
        const avatarUrl = avatars.getInitials(username);
    
        await signIn(email, password);
    
        const newUser = await databases.createDocument(
          config.databaseId,
          config.userCollectionId,
          ID.unique(),
          {
            accountID: newAccount.$id,
            email: email,
            username: username,
            avatar: avatarUrl,
          }
        );
    
        return newUser;
      } catch (error) {
        throw new Error(error);
      }
}

export const signIn = async (email, password) => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    // console.log(currentAccount)

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountID', currentAccount.$id)]
    );

    // console.log(currentUser)

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
