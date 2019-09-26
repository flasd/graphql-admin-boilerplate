import PrivacyPolicy from './PrivacyPolicy';
import path from './PrivacyPolicy.path';
import wrapIn from '../../components/HOC/wrapIn';
import PageSheet from '../../components/General/PageSheet';

export default {
  path,
  component: wrapIn(PageSheet)(PrivacyPolicy),
};
