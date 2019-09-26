import TermsOfService from './TermsOfService';
import path from './TermsOfService.path';
import wrapIn from '../../components/HOC/wrapIn';
import PageSheet from '../../components/General/PageSheet';

export default {
  path,
  component: wrapIn(PageSheet)(TermsOfService),
};
