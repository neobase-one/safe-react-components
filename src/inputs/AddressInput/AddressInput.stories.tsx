import React, { useState, useEffect } from 'react';
import { InputAdornment } from '@material-ui/core';
import styled from 'styled-components';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { Typography } from '@material-ui/core';

import AddressInput from './index';
import { isValidAddress } from '../../utils/address';
import { Switch } from '..';

export default {
  title: 'Inputs/AddressInput',
  component: AddressInput,
  parameters: {
    componentSubtitle: 'Address field input with several variants',
  },
};

const onSubmit = (e: React.FormEvent) => e.preventDefault();

export const SimpleAddressInput = (): React.ReactElement => {
  const [address, setAddress] = useState<string>(
    '0x83eC7B0506556a7749306D69681aDbDbd08f0769'
  );
  const [showNetworkPrefix, setShowNetworkPrefix] = useState<boolean>(true);

  const getAddressFromDomain = () =>
    new Promise<string>((resolve) => {
      setTimeout(
        () => resolve('0x83eC7B0506556a7749306D69681aDbDbd08f0769'),
        1200
      );
    });

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <Typography style={{ marginBottom: '16px' }}>
        <Switch checked={showNetworkPrefix} onChange={setShowNetworkPrefix} />
        Show Network Prefix (rin)
      </Typography>
      <AddressInput
        id={'address-input'}
        label="Ethereum Address"
        name="address"
        placeholder={'Ethereum address'}
        showNetworkPrefix={showNetworkPrefix}
        networkPrefix={'rin'}
        address={address}
        onChangeAddress={(address) => setAddress(address)}
        getAddressFromDomain={getAddressFromDomain}
      />
      <Typography style={{ marginTop: '24px' }}>
        Address value in the State:{' '}
      </Typography>
      <pre
        style={{
          display: 'inline-block',
          backgroundColor: 'lightgrey',
          marginLeft: '8px',
          margin: '0',
          padding: '8px',
          minWidth: '500px',
          borderRadius: '4px',
        }}>
        {address || ' '}
      </pre>
      <Typography style={{ marginTop: '16px' }}>
        You can use ENS names (like safe.test) with the getAddressFromDomain
        prop
      </Typography>
    </form>
  );
};

export const AddressInputWithNetworkPrefix = (): React.ReactElement => {
  const [address, setAddress] = useState<string>(
    '0x83eC7B0506556a7749306D69681aDbDbd08f0769'
  );

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <AddressInput
        label="Prefixed Address"
        name="prefixed-address"
        networkPrefix="rin"
        placeholder={'Ethereum address'}
        showNetworkPrefix={true}
        address={address}
        onChangeAddress={(address) => setAddress(address)}
      />
      <pre>Address in the state: {address}</pre>
    </form>
  );
};

export const AddressInputWithValidation = (): React.ReactElement => {
  const [address, setAddress] = useState<string>(
    '0x83eC7B0506556a7749306D69681aDbDbd08f0769'
  );
  const [hasError, setHasError] = useState<boolean>(
    () => !isValidAddress(address)
  );

  useEffect(() => {
    setHasError(!isValidAddress(address));
  }, [address]);

  const error = 'Invalid Address';

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <AddressInput
        label="Address"
        name="address"
        placeholder={'Ethereum address'}
        networkPrefix="rin"
        showNetworkPrefix={false}
        error={hasError ? error : ''}
        address={address}
        onChangeAddress={(address) => setAddress(address)}
      />
    </form>
  );
};

export const AddressInputWithoutPrefix = (): React.ReactElement => {
  const [address, setAddress] = useState<string>(
    '0x83eC7B0506556a7749306D69681aDbDbd08f0769'
  );

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <AddressInput
        label="Address"
        name="address"
        placeholder={'Ethereum address'}
        networkPrefix="rin"
        showNetworkPrefix={false}
        address={address}
        onChangeAddress={(address) => setAddress(address)}
      />
    </form>
  );
};

export const AddressInputWithENSResolution = (): React.ReactElement => {
  const [address, setAddress] = useState<string>(
    '0x83eC7B0506556a7749306D69681aDbDbd08f0769'
  );

  const getAddressFromDomain = () =>
    new Promise<string>((resolve) => {
      setTimeout(
        () => resolve('0x83eC7B0506556a7749306D69681aDbDbd08f0769'),
        2000
      );
    });

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <AddressInput
        label="Address"
        name="address"
        placeholder={'Ethereum address'}
        networkPrefix="rin"
        showNetworkPrefix={true}
        address={address}
        onChangeAddress={(address) => setAddress(address)}
        getAddressFromDomain={getAddressFromDomain}
      />
    </form>
  );
};

export const SafeAddressInputValidation = (): React.ReactElement => {
  const [address, setAddress] = useState<string>(
    '0x83eC7B0506556a7749306D69681aDbDbd08f0769'
  );
  const [isValidSafeAddress, setIsValidSafeAddress] = useState<boolean>(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState<boolean>(false);

  // check if address is the SafeAddress
  useEffect(() => {
    setShowLoadingSpinner(true);
    setIsValidSafeAddress(false);

    const timeId = setTimeout(() => {
      const isValidSafeAddress =
        address === '0x83eC7B0506556a7749306D69681aDbDbd08f0769';
      setIsValidSafeAddress(isValidSafeAddress);
      setShowLoadingSpinner(false);
    }, 1200);

    return () => {
      clearTimeout(timeId);
    };
  }, [address]);

  const error = 'Address given is not a valid Safe address';

  const showError = !isValidSafeAddress && !showLoadingSpinner;

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <AddressInput
        label="Safe Address"
        name="safeAddress"
        networkPrefix="rin"
        placeholder={'Ethereum address'}
        showNetworkPrefix={false}
        error={showError ? error : ''}
        address={address}
        onChangeAddress={(address) => setAddress(address)}
        showLoadingSpinner={showLoadingSpinner}
        InputProps={{
          endAdornment: isValidSafeAddress && (
            <InputAdornment position="end">
              <CheckIconAddressAdornment />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export const AddressInputLoading = (): React.ReactElement => {
  const [address, setAddress] = useState<string>(
    '0x83eC7B0506556a7749306D69681aDbDbd08f0769'
  );

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <AddressInput
        label="Address"
        name="address"
        networkPrefix="rin"
        showNetworkPrefix={false}
        placeholder={'Ethereum address'}
        showLoadingSpinner
        address={address}
        onChangeAddress={(address) => setAddress(address)}
      />
    </form>
  );
};

export const AddressInputWithAdornment = (): React.ReactElement => {
  const [address, setAddress] = useState<string>(
    '0x83eC7B0506556a7749306D69681aDbDbd08f0769'
  );

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <AddressInput
        label="Address"
        name="address"
        networkPrefix="rin"
        showNetworkPrefix={false}
        showLoadingSpinner={false}
        placeholder={'Ethereum address'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CheckIconAddressAdornment />
            </InputAdornment>
          ),
        }}
        address={address}
        onChangeAddress={(address) => setAddress(address)}
      />
    </form>
  );
};

export const AddressInputDisabled = (): React.ReactElement => {
  const [address, setAddress] = useState<string>(
    '0x83eC7B0506556a7749306D69681aDbDbd08f0769'
  );

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <AddressInput
        label="Address"
        name="address"
        networkPrefix="rin"
        showNetworkPrefix={false}
        showLoadingSpinner={false}
        disabled
        placeholder={'Ethereum address'}
        address={address}
        onChangeAddress={(address) => setAddress(address)}
      />
    </form>
  );
};

export const AddressInputWithErrors = (): React.ReactElement => {
  const [address, setAddress] = useState<string>(
    '0x83eC7B0506556a7749306D69681aDbDbd08f0769'
  );

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <AddressInput
        label="Address"
        name="address"
        networkPrefix="rin"
        showNetworkPrefix={false}
        placeholder={'Ethereum address'}
        showLoadingSpinner={false}
        address={address}
        onChangeAddress={(address) => setAddress(address)}
        error={'Invalid Address'}
      />
    </form>
  );
};

const CheckIconAddressAdornment = styled(CheckCircle)`
  color: #03ae60;
  height: 20px;
`;