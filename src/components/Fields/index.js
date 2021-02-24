import Text from './Text';
import Header from './Header';
import User from './User';
import Select from './Select';
import ToggleButton from './ToggleButton';
import Label from './Label';
import Photo from './Photo';
import QrScanner from './QrScanner';
import Image from './Image';
import DrawingBoard from './Drawing';
import PhoneNumber from './PhoneNumber';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import DateTimePicker from './DateTimePicker';
import Duration from './Duration';
import Signature from './Signature';
import Checkbox from './Checkbox';
import Currency from './Currency';
import Button from './Button';

export default {
  text: Text,
  numeric: Text,
  header: Header,
  toggle: ToggleButton,
  user: User,
  select: Select,
  label: Label,
  image: Image,
  drawing: DrawingBoard,
  button: Button,
  score: Text,
  phone: PhoneNumber,
  date: DatePicker,
  time: TimePicker,
  datetime: DateTimePicker,
  duration: Duration,
  signature: Signature,
  contact: Select,
  currency: Currency,
  checkbox: Checkbox,
  selectmulti: Select,
  project: Select,
  product: Select,
  opp: Select,
  asset: Select,
  tool: Select,
  form: Select,
  file: Select,
  photo: Photo,
  barcode: QrScanner,
  textarea: Text,
  decimal: Text,
  email: Text,
  link: Text,
};
