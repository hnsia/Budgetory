import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Currencies, CurrenciesArray, ExpenseTypes, ExpenseTypesArray } from './ExpenseFieldTypes';
import moment from 'moment';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, FormHelperText, FormControl, InputLabel, MenuItem, Select, TextField, Stack, Box } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'moment/locale/en-gb';

const locale = 'en-gb';
const expenseCreateApiUri = 'http://localhost:3001/expense/create';

type ExpenseFormInputs = {
    name: string,
    expenseType: ExpenseTypes,
    amount: number,
    description: string,
    expenseDate: Date,
    currencyISO: Currencies,
};

interface ExpenseFormData extends ExpenseFormInputs{
    userId: number
};

const ExpenseForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ExpenseFormInputs>();
    const currentDateTime = new Date();
    const onSubmit: SubmitHandler<ExpenseFormInputs> = async (data) => {
        const formData:ExpenseFormData = {...data,
            userId: 1
        }

        console.log(formData);

        let response = await fetch(expenseCreateApiUri, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        let responseData = await response.json();
        
        if (response.ok){
            return responseData !== null ? responseData : null;
        }

        if(response.status === 400) {
            throw Error(`Error posting data with status: ${response.status} ${response.statusText}`);
        }

        throw Error(`Error posting data with status: ${response.status} ${response.statusText}`);
    }

    const [date, setDate] = useState<Date | null>(currentDateTime);
    const handleDateChange = (newDate: Date | null) => {
        setDate(newDate);
    };

    return (
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} id='expense-form'>
                    <Stack spacing={5}>
                        <TextField label='Name' {...register("name", { required: "Name of expense is required" })} placeholder='Enter the expense name here' 
                        error={!!errors.name} helperText={errors.name?.message}></TextField>

                        <FormControl error={!!errors.expenseType}>
                            <InputLabel id='expense-form-expense-type-label'>Expense type</InputLabel>
                            <Select labelId='expense-form-expense-type-label' label='Expense type' {...register("expenseType", { required: "Expense type is required" })}>
                                {ExpenseTypesArray.map((expenseType) => (
                                    <MenuItem key={expenseType} value={expenseType}> {expenseType} </MenuItem> 
                                ))}
                            </Select>
                            <FormHelperText>{errors.expenseType?.message}</FormHelperText>
                        </FormControl>
                        
                        <TextField label='Amount' {...register("amount", { required: "Expense amount is required" })} placeholder='Enter the amount here'
                        error={!!errors.amount} helperText={errors.amount?.message}></TextField>

                        <TextField label='Description' {...register("description")} placeholder='Enter a description here'></TextField>
                        
                        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
                            <DateTimePicker
                                label="Date Time"
                                value={date}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} {...register("expenseDate", { required:"Expense date is required" })} 
                                error={!!errors.expenseDate} helperText={errors.expenseDate?.message}/>}
                            />
                        </LocalizationProvider>

                        <FormControl error={!!errors.currencyISO}>
                            <InputLabel id='expense-form-currency-label'>Currency</InputLabel>
                            <Select labelId='expense-form-currency-label' label='Currency' {...register("currencyISO", { required: "Currency is required" })}>
                                {CurrenciesArray.map((currency) => (
                                    <MenuItem key={currency} value={currency}> {currency} </MenuItem> 
                                ))}
                            </Select>
                            <FormHelperText>{errors.currencyISO?.message}</FormHelperText>
                        </FormControl>
                    </Stack>
                    
                </form>
            </CardContent>
            <CardActions>
                <Box m={1}>
                    <Button type='submit' form='expense-form' variant='contained'>
                        Add Expense
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
}

export default ExpenseForm;