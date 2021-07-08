'use strict'

// https://www.raymondcamden.com/2019/10/16/using-indexeddb-with-vuejs
// https://developers.google.com/web/ilt/pwa/working-with-indexeddb#updating_data
// https://www.tutorialdocs.com/article/indexeddb-tutorial.html

const DB_NAME = 'eventDB';
const DB_VERSION = 1;
let DB;

export default {

  async getDb() {
    return new Promise((resolve, reject) => {
      
      if(DB) { return resolve(DB); }
      console.log('OPENING DB', DB);
      let request = window.indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onerror = e => {
        console.log('Error opening db', e);
        reject('Error');
      };
      
      request.onsuccess = e => {
        DB = e.target.result;
        resolve(DB);
      };
      
      request.onupgradeneeded = e => {
        console.log('onupgradeneeded');
        let db = e.target.result;
        db.createObjectStore("events", { keyPath: 'id' });
      };
      
    });
  },
  
  async deleteEvent(id) {
    let db = await this.getDb();
    
    return new Promise(resolve => {
    
      let trans = db.transaction(['events'],'readwrite');
      trans.oncomplete = () => {
        resolve();
      };
      
      let store = trans.objectStore('events');
      store.delete(id);
      
    });
  },
  
  async getEvents() {
    let db = await this.getDb();
    
    return new Promise(resolve => {
      
      let trans = db.transaction(['events'],'readonly');
      trans.oncomplete = () => {
        resolve(events);
      };
      
      let store = trans.objectStore('events');
      let events = [];
      
      store.openCursor().onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          events.push(cursor.value)
          cursor.continue();
        }
      };
    });
  },
  
  async getEvent(id) {
    
    let db = await this.getDb();
    
    return new Promise(resolve => {
      
      let trans = db.transaction(['events'],'readwrite');
      trans.oncomplete = () => {
        resolve();
      };
      
      let store = trans.objectStore('events');
      store.get(id);
    
    });
  },
  
  async addEvent(event) {
    
    let db = await this.getDb();
    
    return new Promise(resolve => {
      
      let trans = db.transaction(['events'],'readwrite');
      trans.oncomplete = () => {
        resolve();
      };
      
      let store = trans.objectStore('events');
      store.add(event);
      
    });
  },
  
  async updateEvent(event) {
    
    let db = await this.getDb();
    
    return new Promise(resolve => {
      
      let trans = db.transaction(['events'],'readwrite');
      trans.oncomplete = () => {
        resolve();
      };
      
      let store = trans.objectStore('events');
      store.put(event);
      
    });
  },

}