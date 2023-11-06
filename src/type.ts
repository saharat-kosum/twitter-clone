export interface UserType {
  _id?:string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  occupation: string;
  location: string;
  picturePath?: string;
  friends?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostType {
  _id?:string;
  userId: string;
  firstName: string;
  lastName: string;
  description?: string;
  userPicturePath?: string;
  picturePath?: string;
  likes?: string[];
  comments?: CommentType[];
  createdAt?: Date;
}

export interface PostPayload {
  userId?: string;
  description?: string;
}

export interface CommentType {
  firstName: string;
  lastName: string;
  userPicturePath?: string;
  description: string;
}

export interface PostPayload {
  userId?: string;
  description?: string;
}