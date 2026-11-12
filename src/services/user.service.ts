import { UserRepository } from '../repositories/user.repository';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserRequest, UpdateUserRequest, User } from '../types/user.types';
import bcrypt from 'bcrypt';

const userRepository = new UserRepository();

export class UserService {

  async getAllUsers(): Promise<User[]> {
    return await userRepository.findAll();
  }

  async getUserById(id: string): Promise<User | null> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid user ID');
    }
    return await userRepository.findById(id);
  }

  async createUser(data: CreateUserRequest): Promise<User> {

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

  async updateUser(id: string, data: UpdateUserRequest) :Promise<User | null> {
    // Valider l'ID
    const userToUpdate = await this.getUserById(id);
    if (!userToUpdate) {
      return null;
    }

    userToUpdate.password = data.password;
    userToUpdate.email = data.email;
    // Appeler le repo pour sauvegarder les changements
    await userRepository.update(id, userToUpdate);
    return userToUpdate;
  }

  async deleteUser(id: string) {
    const userToUpdate = await this.getUserById(id);
    if (!userToUpdate) {
      return null;
    }
    await userRepository.delete(id);
    return userToUpdate;
  }


  // Les autres actions du service (update, delete, etc.) peuvent être ajoutées ici
  
}

