import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import DataArrayIcon from '@mui/icons-material/DataArray';
import CodeIcon from '@mui/icons-material/Code';
import Menu from '@mui/material/Menu';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import KeyboardAltIcon from '@mui/icons-material/KeyboardAlt';
import TerminalIcon from '@mui/icons-material/Terminal';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const LeftNav = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
  padding: theme.spacing(1),
}));

export default function Nav() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const role = useSelector((state) => state.user.username);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Trojan Guardian
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {role}
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <LeftNav
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            paddingTop: '64px',
          },
        }}
      >
        <div style={{ width: drawerWidth }}>
          <NavLink to="/home" onClick={handleDrawerClose}>
            <IconButton color="inherit">
              <HomeIcon />
            </IconButton>
            <Typography variant="h6">Home</Typography>
          </NavLink>
          {role==="Ministry" || role==="Manufacturer" ?
          <NavLink to="/rtl" onClick={handleDrawerClose}>
            <IconButton color="inherit">
              <TerminalIcon />
            </IconButton>
            <Typography variant="h6">RTL</Typography>
          </NavLink> : <></>
        }
        {role==="Ministry" || role=="Embedded Developer" ?
          <NavLink to="/embedded" onClick={handleDrawerClose}>
            <IconButton color="inherit">
              <CodeIcon />
            </IconButton>
            <Typography variant="h6">Embedded C</Typography>
          </NavLink> : <></>
        }
        {role==="Ministry" || role=="Embedded Developer" ?
          <NavLink to="/python" onClick={handleDrawerClose}>
            <IconButton color="inherit">
              <DataArrayIcon />
            </IconButton>
            <Typography variant="h6">Python</Typography>
          </NavLink> : <></>
        }
        {role==="Ministry" || role==="Manufacturer" ?
          <NavLink to="/atpg" onClick={handleDrawerClose}>
            <IconButton color="inherit">
              <ElectricalServicesIcon />
            </IconButton>
            <Typography variant="h6">ATPG</Typography>
          </NavLink> : <></>
        }
        {role==="Ministry" || role=="PCB Designer" ?
          <NavLink to="/pcb" onClick={handleDrawerClose}>
            <IconButton color="inherit">
              <KeyboardAltIcon />
            </IconButton>
            <Typography variant="h6"> PCB </Typography>
          </NavLink> : <></>
        }

        <NavLink to="/IPFS" onClick={handleDrawerClose}>
            <IconButton color="inherit">
              <InsertDriveFileIcon />
            </IconButton>
            <Typography variant="h6"> IPFS </Typography>
          </NavLink>

          <NavLink to="/about" onClick={handleDrawerClose}>
            <IconButton color="inherit">
              <InfoIcon />
            </IconButton>
            <Typography variant="h6">About</Typography>
          </NavLink>
          <NavLink to="/contact" onClick={handleDrawerClose}>
            <IconButton color="inherit">
              <CallIcon />
            </IconButton>
            <Typography variant="h6">Contact</Typography>
          </NavLink>
        </div>
      </LeftNav>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
