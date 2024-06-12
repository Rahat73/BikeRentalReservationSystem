import { User } from './user.model';

const getProfileFromDB = async () => {
  const profile = await User.find();
  return profile;
};

export const UserServices = {
  getProfileFromDB,
};
