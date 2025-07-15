import * as SQLite from 'expo-sqlite';
import * as Crypto from 'expo-crypto';

interface Crime {
  id?: string; 
  title: string;
  details: string;
  date: string | Date;
  solved?: boolean;
  image?: string | null;
  createdAt?: string;
}

const db = SQLite.openDatabaseSync('criminalIntent.db');

export const initializeDatabase = () => {
  try {
    db.execSync(`
        CREATE TABLE IF NOT EXISTS crimes (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            details TEXT NOT NULL,
            date TEXT NOT NULL,
            solved BOOLEAN NOT NULL DEFAULT 0,
            image TEXT,
            createdAt TEXT NOT NULL DEFAULT (datetime('now'))
        )
    `);

    try {
      db.execSync(`ALTER TABLE crimes ADD COLUMN image TEXT`);
    } catch (alterError) {
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

export const resetDatabase = () => {
  try {
    db.execSync('DROP TABLE IF EXISTS crimes');
    initializeDatabase();
  } catch (error) {
    console.error('Database reset error:', error);
    throw error;
  }
};

export const insertCrime = (crime: Crime) => {
  try {
    const crimeId = Crypto.randomUUID();
    const statement = db.prepareSync(
      'INSERT INTO crimes (id, title, details, date, solved, image) VALUES (?, ?, ?, ?, ?, ?)'
    );

    const dateString = crime.date instanceof Date ? crime.date.toISOString() : crime.date;
    
    statement.executeSync([
      crimeId,          
      crime.title || '',
      crime.details || '',
      dateString,
      crime.solved ? 1 : 0,
      crime.image || null
    ]);
    
    return crimeId; 
  } catch (error) {
    console.error('Database insert error:', error);
    throw error;
  }
};

export const getAllCrimes = (): Crime[] => {
  try {
    const tableExists = db.getFirstSync("SELECT name FROM sqlite_master WHERE type='table' AND name='crimes'");
    if (!tableExists) {
      initializeDatabase();
    }
    
    const statement = db.prepareSync('SELECT * FROM crimes ORDER BY createdAt DESC');
    return statement.executeSync().getAllSync() as Crime[];
  } catch (error) {
    console.error('Database select error:', error);
    try {
      initializeDatabase();
      const statement = db.prepareSync('SELECT * FROM crimes ORDER BY createdAt DESC');
      return statement.executeSync().getAllSync() as Crime[];
    } catch (retryError) {
      console.error('Database retry error:', retryError);
      return [];
    }
  }
};

export const getCrimeById = (id: string): Crime | null => {
  const statement = db.prepareSync('SELECT * FROM crimes WHERE id = ?');
  return statement.executeSync([id]).getFirstSync() as Crime | null;
};

export const updateCrime = (crime: Crime) => {
  const statement = db.prepareSync(
    'UPDATE crimes SET title = ?, details = ?, date = ?, solved = ?, image = ? WHERE id = ?'
  );
  
  const dateString = crime.date instanceof Date ? crime.date.toISOString() : crime.date;
  
  return statement.executeSync([
    crime.title,
    crime.details,
    dateString,
    crime.solved ? 1 : 0,
    crime.image || null,
    crime.id ? crime.id : null
  ]);
};

export const deleteCrime = (id: string) => {
  try {
    const statement = db.prepareSync('DELETE FROM crimes WHERE id = ?');
    return statement.executeSync([id]);
  } catch (error) {
    console.error('Database delete error:', error);
    throw error;
  }
};