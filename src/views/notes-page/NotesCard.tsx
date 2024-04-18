import React from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

// project imports
import UserSimpleCard from 'ui-component/cards/UserSimpleCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { dispatch } from 'store';
import { getSimpleCards, filterSimpleCards } from 'store/slices/user';

// assets
import { IconSearch } from '@tabler/icons-react';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';


// ==============================|| USER CARD STYLE 2 ||============================== //

interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: number;
    updatedAt: number;
}

interface NotesCardProps {
    userId: string;
    notebook: string;
    notes: Note[];
}

const NotesCard = (NotesCardProps: NotesCardProps) => {
    const userId = NotesCardProps.userId;
    const notebook = NotesCardProps.notebook;
    const notes = NotesCardProps.notes;
    // const [users, setUsers] = React.useState<UserSimpleCardProps[]>([]);
    // const { simpleCards } = useSelector((state) => state.user);
    const [anchorEl, setAnchorEl] = React.useState<Element | (() => Element) | null | undefined>(null);
    const handleClick = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // React.useEffect(() => {
    //     setUsers(simpleCards);
    // }, [simpleCards]);

    React.useEffect(() => {
        dispatch(getSimpleCards());
    }, []);

    const [search, setSearch] = React.useState<string | undefined>('');
    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
        const newString = event?.target.value;
        setSearch(newString);

        if (newString) {
            dispatch(filterSimpleCards(newString));
        } else {
            dispatch(getSimpleCards());
        }
    };

    let notesResult: React.ReactElement | React.ReactElement[] = <></>;
    if (notes) {
        notesResult = notes.map((note, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <UserSimpleCard
                    userId={userId} 
                    noteId={note.id}
                    title={note.title}
                    createdAt={note.createdAt}
                    updatedAt={note.updatedAt}
                />
            </Grid>
        ));
    }

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">{notebook}</Typography>
                    </Grid>
                    <Grid item>
                        <OutlinedInput
                            id="input-search-card-style2"
                            placeholder="Search"
                            value={search}
                            onChange={handleSearch}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch stroke={1.5} size="16px" />
                                </InputAdornment>
                            }
                            size="small"
                        />
                    </Grid>
                </Grid>
            }
        >
            <Grid container direction="row" spacing={gridSpacing}>
                {notesResult}
                <Grid item xs={12}>
                    <Grid container justifyContent="space-between" spacing={gridSpacing}>
                        <Grid item>
                            <Pagination count={10} color="primary" />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="text"
                                size="large"
                                sx={{ color: 'grey.900' }}
                                color="secondary"
                                endIcon={<ExpandMoreRoundedIcon />}
                                onClick={handleClick}
                            >
                                10 Rows
                            </Button>
                            <Menu
                                id="menu-user-card-style2"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                variant="selectedMenu"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                            >
                                <MenuItem onClick={handleClose}> 10 Rows</MenuItem>
                                <MenuItem onClick={handleClose}> 20 Rows</MenuItem>
                                <MenuItem onClick={handleClose}> 30 Rows </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default NotesCard;
