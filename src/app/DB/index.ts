import { UserRole } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const admin = {
  name: 'Rahat Ashik',
  email: 'admin@mail.com',
  password: '123456',
  phone: '01303211682',
  address: 'Admin Address',
  role: UserRole.admin,
};

const seedAdmin = async () => {
  //when database is connected, we will check is there any user who is admin
  const isAdminExits = await User.findOne({ role: UserRole.admin });

  if (!isAdminExits) {
    await User.create(admin);
  }
};

export default seedAdmin;
