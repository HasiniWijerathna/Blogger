
const users = [{
  id: 1,
  name: 'user1',
  email: 'user1@mail.com',
  password: 'user1'
}, {
  id: 1,
  name: 'user2',
  email: 'user2@mail.com',
  password: 'user2'
}, {
  id: 1,
  name: 'user3',
  email: 'user3@mail.com',
  password: 'user3'
}];

/**
 * Returns all user objects
 * @return {Array} The user array
 */
const getAllUsers = () => users;

export { getAllUsers };
