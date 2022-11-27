import * as DataLoader from 'dataloader';
import { mapFromArray } from 'src/helpers/utils';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

export function createUserIdsLoader(usersService: UsersService) {
  return new DataLoader<string, User>(async (ids) => {
    const users = await usersService.findUsersByIds(ids);
    const usersMap = mapFromArray(users, (p) => p.id);
    return ids.map((id) => usersMap[id]);
  });
}
