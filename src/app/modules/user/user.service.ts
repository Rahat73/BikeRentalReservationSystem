import QueryBuilder from '../../../builder/QueryBuilder';
import { userSearchableFields } from './user.constants';
import { TUser } from './user.interface';
import { User } from './user.model';

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;

  return result;
};

const getProfileFromDB = async (email: string) => {
  const profile = await User.findOne({ email });
  return profile;
};

const updateProfileIntoDB = async (email: string, payload: Partial<TUser>) => {
  const result = await User.findOneAndUpdate({ email }, payload, { new: true });
  return result;
};

export const UserServices = {
  getAllUsersFromDB,
  getProfileFromDB,
  updateProfileIntoDB,
};
