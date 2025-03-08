import { Client, Databases, ID, Query } from "appwrite";
const VITE_APPWRITE_ID = "67c9aaae000634669e97";
const VITE_DB_ID = "67c9ab6e00176a88a797";
const VITE_COLLECTOIN_ID = "67c9aba90008c0d590c7";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(VITE_APPWRITE_ID);

const database = new Databases(client);
export const updateSearchCount = async (search, movie) => {
  try {
    const result = await database.listDocuments(
      VITE_DB_ID,
      VITE_COLLECTOIN_ID,
      [Query.equal("search", search)]
    );
    if (result.documents.length > 0) {
      const doc = result.documents[0];

      await database.updateDocument(VITE_DB_ID, VITE_COLLECTOIN_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      await database.createDocument(
        VITE_DB_ID,
        VITE_COLLECTOIN_ID,
        ID.unique(),
        {
          search,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      );
    }
  } catch (e) {
    console.log(e);
  }
};
export const trending = async () => {
  try {
    const result = await database.listDocuments(
      VITE_DB_ID,
      VITE_COLLECTOIN_ID,
      [Query.limit(6), Query.orderDesc("count")]
    );
    return result.documents;
  } catch (e) {
    console.log(e);
  }
};
