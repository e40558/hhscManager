import { User } from "../enties/user";
import { Session } from "./session";


class SessionStore{
    destroySession(sessionId: string) {
       delete this.sessions[sessionId]
    }

    
    private sessions: {[key:string] : Session} ={};


    createSession(sessionId: string, user: User){
        this.sessions[sessionId] = new Session(sessionId,user)
    }

    findUserBySessionId(sessionId:string): User | undefined{
        const session = this.sessions[sessionId];

      
        return this.isSessionValid(sessionId) ? session.user : undefined;
    }

    isSessionValid(sessionId: string): boolean {

        const session = this.sessions[sessionId];

        return session && session.isValid()
    }
}


export const sessionStore = new SessionStore();