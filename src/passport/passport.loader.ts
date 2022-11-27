import * as DataLoader from 'dataloader';
import { mapFromArray } from 'src/helpers/utils';
import { Passport } from 'src/passport/passport.entity';
import { PassportService } from 'src/passport/passport.service';

export function createPassportIdsLoader(passportService: PassportService) {
  return new DataLoader<string, Passport>(async (ids) => {
    const passports = await passportService.findPassportByIds(ids);
    const passportsMap = mapFromArray(passports, (p) => p.id);
    return ids.map((id) => passportsMap[id]);
  });
}
