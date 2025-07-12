import * as SQLite from 'expo-sqlite';
import * as Crypto from 'expo-crypto';

interface Crime {
  id?: string; // Changed from number to string for UUID
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
    // Create new table with UUID primary key
    db.execSync(`
        CREATE TABLE IF NOT EXISTS crimes_new (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            details TEXT NOT NULL,
            date TEXT NOT NULL,
            solved BOOLEAN NOT NULL DEFAULT 0,
            image TEXT,
            createdAt TEXT NOT NULL DEFAULT (datetime('now'))
        )
    `);

    // Check if old table exists and migrate data if needed
    try {
      const oldTableExists = db.getFirstSync("SELECT name FROM sqlite_master WHERE type='table' AND name='crimes'");
      if (oldTableExists) {
        // Copy data from old table to new table with UUIDs
        const oldCrimes = db.getAllSync('SELECT * FROM crimes') as any[];
        for (const crime of oldCrimes) {
          const uuid = Crypto.randomUUID();
          db.runSync(
            'INSERT INTO crimes_new (id, title, details, date, solved, image, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [uuid, crime.title, crime.details, crime.date, crime.solved || 0, crime.image, crime.createdAt]
          );
        }
        // Drop old table and rename new one
        db.execSync('DROP TABLE crimes');
        db.execSync('ALTER TABLE crimes_new RENAME TO crimes');
        console.log('Migrated to UUID-based table');
      } else {
        // No old table, just rename the new one
        db.execSync('ALTER TABLE crimes_new RENAME TO crimes');
      }
    } catch (migrationError) {
      console.log('Migration not needed or completed');
    }

    try {
      db.execSync(`ALTER TABLE crimes ADD COLUMN image TEXT`);
      console.log('Added image column to existing table');
    } catch (alterError) {
      console.log('image column already exists or table is new');
    }
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

export const insertCrime = (crime: Crime) => {
  try {
    const crimeId = Crypto.randomUUID(); // Generate UUID
    const statement = db.prepareSync(
      'INSERT INTO crimes (id, title, details, date, solved, image) VALUES (?, ?, ?, ?, ?, ?)'
    );

    const dateString = crime.date instanceof Date ? crime.date.toISOString() : crime.date;
    
    statement.executeSync([
      crimeId,           // UUID instead of auto-increment
      crime.title || '',
      crime.details || '',
      dateString,
      crime.solved ? 1 : 0,
      crime.image || null
    ]);
    
    return crimeId; // Return the UUID
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

export const getCrimeById = (id: string) => {
  const statement = db.prepareSync('SELECT * FROM crimes WHERE id = ?');
  return statement.executeSync([id]).getFirstSync();
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