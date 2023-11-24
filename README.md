## Tanda client

A typescript async / await client for the Tanda API. In the context of this application it can only be used on the server and will throw errors if used on the client.

## Usage

```typescript
import { PayrollClientInitialiser } from 'utilities/server-actions/external-applications/tanda';

const tanda = new PayrollClientInitialiser({ 
  type: 'classic',
  token: '1234'
});

```

This will return a client that you can use to make requests to the tanda API. If you have multiple Tanda organisations you can create multiple clients like so:

```typescript

const tandaOne = new PayrollClientInitialiser({ 
  type: 'classic',
  token: '1234'
});
const tandaTwo = new PayrollClientInitialiser({
  type: 'classic',
  token: '1234'
});
```

There are two types of client. The first is the 'classic' using a bearer token for authorisation. The second is 'oauth'.

There is a third argument that can go into the building of a client which is optional headers. If you do not use optional headers the default headers will be used which is:

```
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }

```

_note_
_oauth is currently not coded._

## Methods

The client is split into endpoint blocks such as Staff (Users) which follow the Tanda API documentation found here - https://my.tanda.co/api/v2/documentation

To call a method: 

```typescript

const staff = await tanda.Staff.getStaff();

```

Params are typed in the following way:

**GET Requests**
- pathParams: first argument
- queryParams: second argument

**PUT/POST Requests**
- pathParams: first argument
- body: second argument
- queryParams: third argument

## Things to be mindful of
- There may be errors accross the board with the return responses. Tanda API documentation is not always clear on the return types of the responses.
- The error return for an API is a generic JSON object that contains:
```
  {
    error: boolean;
    message: string;
    code: number;
  }
```
- Error messages will be returned if the response is not 200 or 201.