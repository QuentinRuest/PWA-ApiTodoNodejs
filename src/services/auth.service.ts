import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import { Register } from '../types/auth.types';
import { User } from '../types/user.types';
import { v4 as uuidv4 } from 'uuid';

const userRepository = new UserRepository();

export class AuthService {
    async login(email: string, password: string) {
        const user = await userRepository.FindByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return null;
        }

        return user;
    }
    async Register(data: Register): Promise<User> {

    // Dans le service, on crée un bel objet tout propre à partir des données reçues.
    // On génère un ID unique pour l'utilisateur.
    const id = uuidv4();
    const now = new Date();
    // quand on crée un utilisateur, qu'est-ce qui est requis ?
    // qu'est-ce qui est optionnel (qu'on peut définir par défaut) ?
    
    const user = {
      id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
      role: data.role,
      createdAt: now,
      updatedAt: now,
    };
    // On appel le repo pour créer l'utilisateur.
    // Ensuite, on retourne l'utilisateur créé au contrôleur.
    return await userRepository.create(user);
  }
}

