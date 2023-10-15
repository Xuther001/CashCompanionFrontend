import { useRef, useState, useEffect } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getFirestore, getDoc, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { auth, app } from './firebase';
import './FirebaseChatComponent.css'

const db = getFirestore(app);

function FirebaseComponent() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      })));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // Scroll to the bottom whenever messages change

  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      text: newMessage,
      timestamp: serverTimestamp(),
    });

    setNewMessage("");
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="FirebaseComponent">
      {user ? (
        <>
          <div className="logged-in-info">
            <div>Logged in as {user.displayName}</div>
            <input
              style={{ width: '97%', padding: '10px' }}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send Message</button>
            <button onClick={() => auth.signOut()}>Logout</button>
          </div>

          <div ref={chatContainerRef} className="message-container">
            {messages.map((msg) => (
              <div key={msg.id} className="message">
                <img src={msg.data.photoURL} alt="User's Photo" className="user-photo"/>
                {msg.data.text}
              </div>
            ))}
          </div>
        </>
      ) : (
        <button onClick={handleGoogleLogin}>Login with Google</button>
      )}
    </div>
  );
}

export default FirebaseComponent;