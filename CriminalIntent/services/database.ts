import * as SQLite from 'expo-sqlite';

interface Crime {
  id?: number;
  title: string;
  details: string;
  date: string | Date;
  createdAt?: string;
}

const db = SQLite.openDatabaseSync('criminalIntent.db');

export const initializeDatabase = () => {
  try {
    db.execSync(`
        CREATE TABLE IF NOT EXISTS crimes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            details TEXT NOT NULL,
            date TEXT NOT NULL,
            createdAt TEXT NOT NULL DEFAULT (datetime('now'))
        )
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

export const insertCrime = (crime: Crime) => {
  try {
    const statement = db.prepareSync(
      'INSERT INTO crimes (title, details, date) VALUES (?, ?, ?)'
    );
    
    // Convert date to string if it's a Date object
    const dateString = crime.date instanceof Date ? crime.date.toISOString() : crime.date;
    
    const result = statement.executeSync([
      crime.title || '',
      crime.details || '',
      dateString,
    ]);
    
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Database insert error:', error);
    throw error;
  }
};

export const getAllCrimes = () => {
  try {
    const statement = db.prepareSync('SELECT * FROM crimes ORDER BY createdAt DESC');
    return statement.executeSync().getAllSync();
  } catch (error) {
    console.error('Database select error:', error);
    return [];
  }
};

export const updateCrime = (crime: Crime) => {
  const statement = db.prepareSync(
    'UPDATE crimes SET title = ?, details = ?, date = ?'
  );
  
  const dateString = crime.date instanceof Date ? crime.date.toISOString() : crime.date;
  
  return statement.executeSync([
    crime.title,
    crime.details,
    dateString
  ]);
};

export const deleteCrime = (id: number) => {
  const statement = db.prepareSync('DELETE FROM crimes WHERE id = ?');
  return statement.executeSync([id]);
};