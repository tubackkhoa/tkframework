import Home from './containers/Home'
// components
import ActionButton from './containers/ActionButton'
import ActionButtonToolbar from './containers/ActionButton/toolbar'
import ActionButtonSpeedDial from './containers/ActionButton/speed-dial'
import Avatar from './containers/Avatar'
import Badge from './containers/Badge'
import Button from './containers/Button'
import Card from './containers/Card'
import RelayPage from './containers/RelayPage'
import Youtube from './containers/Youtube'
import Chat from './containers/Chat'
import MapPage from './containers/Map'
import Checkbox from './containers/Checkbox'
import Dialog from './containers/Dialog'
import Drawer from './containers/Drawer'
import IconToggle from './containers/IconToggle'
import List from './containers/List'
import RadioButton from './containers/RadioButton'
import Toolbar from './containers/Toolbar'

export default {
    home: {
        title: 'Select component',
        Page: Home,
    },
    relay: {
        title: 'Relay & GraphQL',
        Page: RelayPage,
    },
    youtube: {
        title: 'Youtube',
        Page: Youtube,
    },
    chat: {
        title: 'Chat',
        Page: Chat,
    },
    map: {
        title: 'Map',
        Page: MapPage,
    },
    actionButton: {
        title: 'Action buttons',
        Page: ActionButton,
    },
    actionButtonToolbar: {
        title: 'Toolbar transition',
        Page: ActionButtonToolbar,
    },
    actionButtonSpeedDial: {
        title: 'Speed dial transition',
        Page: ActionButtonSpeedDial,
    },
    avatar: {
        title: 'Avatars',
        Page: Avatar,
    },
    badge: {
        title: 'Badge',
        Page: Badge,
    },
    button: {
        title: 'Buttons',
        Page: Button,
    },
    card: {
        title: 'Cards',
        Page: Card,
    },    
    dialog: {
        title: 'Dialogs',
        Page: Dialog,
    },
    drawer: {
        title: 'Drawer',
        Page: Drawer,
    },
    iconToggle: {
        title: 'Icon toggles',
        Page: IconToggle,
    },
    list: {
        title: 'List items',
        Page: List,
    },
    radioButton: {
        title: 'Radio buttons',
        Page: RadioButton,
    },
    toolbar: {
        title: 'Toolbars',
        Page: Toolbar,
    },
}
