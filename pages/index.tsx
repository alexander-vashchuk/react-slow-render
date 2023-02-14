import { randUser } from "@ngneat/falso";
import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import {
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface Person {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  img: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
  phone: string;
}

export default function Home() {
  const [people, setPeople] = useState<Person[]>([]);
  const [usersList, setUsersList] = useState<string[]>([]);

  useEffect(() => {
    setPeople(randUser({ length: 1000 }));
  }, []);

  return (
    <TableContainer component={Paper} sx={{ fontFamily: "Arial" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{
              "& .MuiTableCell-root": {
                fontSize: "20px",
                textAlign: "center",
              },
            }}
          >
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Id</TableCell>
            <TableCell>Number</TableCell>
            <TableCell>CheckBox</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {people.map((person) => (
            <TableRow
              key={person.id}
              sx={{
                "&:nth-of-type td, &:nth-of-type th": { border: 0 },
                "& .MuiTableCell-root": {
                  textAlign: "center",
                },
              }}
            >
              <TableCell component="th" scope="row">
                {person.firstName}
              </TableCell>
              <TableCell component="th" scope="row">
                {person.email}
              </TableCell>
              <TableCell>{person.id}</TableCell>
              <TableCell>{person.phone}</TableCell>
              <TableCell>
                <FormControlLabel
                  id={person.id}
                  control={
                    <Checkbox
                      sx={{
                        "&.Mui-checked": {
                          color: "rgb(75, 180, 128)",
                        },
                      }}
                      checked={usersList.includes(person.id)}
                    />
                  }
                  label="Checkbox"
                  onChange={() => {
                    if (usersList.includes(person.id)) {
                      const updatedPlayerList = usersList.filter(
                        (playerId) => playerId !== person.id
                      );

                      setUsersList(updatedPlayerList);
                    } else {
                      setUsersList([...usersList, person.id]);
                    }
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
