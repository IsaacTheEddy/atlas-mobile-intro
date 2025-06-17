import { useSQLiteContext } from "expo-sqlite";
import { useState, useEffect } from "react";

export interface Activities {
  id: number;
  steps: number;
  date: number;
}

export function useActivities() {
  const [activities, setActivities] = useState<Activities[]>([]);
  const db = useSQLiteContext();

  function getActivities() {
    return db.getAllSync<Activities>(
      "SELECT * FROM activities ORDER BY date DESC;"
    );
  }

  function insertActivity(steps: number, date: Date) {
    db.execSync(
      `INSERT INTO activities (steps, date) VALUES (${steps}, ${date.getTime()} )`
    );
    reload();
  }
  function deleteActivities() {
    db.execSync(`DELETE FROM activities ;`);
    reload();
  }
  function deleteActivity(id: number) {
    db.execSync(`DELETE FROM activities WHERE id = ${id};`);
    reload();
  }

  function reload() {
    const data = getActivities();
    setActivities(data);
  }

  useEffect(() => {
    reload();
  }, []);

  return {
    getActivities,
    insertActivity,
    deleteActivities,
    deleteActivity,
    activities,
  };
}
