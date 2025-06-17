import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Suspense, useEffect, useState } from "react";
import { Text, View } from "react-native";

async function loadDatabase() {
  const name = "activities.db";
  const database = `${FileSystem.documentDirectory}SQLite/${name}`;

  const fileInfo = await FileSystem.getInfoAsync(database);

  if (!fileInfo.exists) {
    // Create the db
    const databaseAsset = require("@/assets/" + name);
    const dbURI = Asset.fromModule(databaseAsset).uri;
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbURI, database);
  }
}

function useDB() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadDatabase().then(() => setLoaded(true));
  }, []);
  return { loaded };
}

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const { loaded } = useDB();

  if (!loaded) {
    return null;
  }

  return (
    <Suspense
      fallback={
        <View>
          <Text>Loading</Text>
        </View>
      }
    >
      <SQLite.SQLiteProvider useSuspense databaseName="activities.db">
        {children}
      </SQLite.SQLiteProvider>
    </Suspense>
  );
}
