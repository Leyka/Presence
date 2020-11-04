import React, { FC, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

export interface Props {
  acceptFormat: string;
  text: string;
  uploadFiles(files: File[]);
  multiple?: boolean;
}

const StyledDropZoneText = styled.div`
  height: inherit;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
`;

export const DropZone: FC<Props> = (props) => {
  const { acceptFormat, text, uploadFiles, multiple } = props;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      uploadFiles(acceptedFiles);
    },
    [uploadFiles]
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: acceptFormat,
    onDrop,
    multiple: multiple ?? true,
  });

  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    height: '150px',
    marginTop: '15px',
  };

  const activeStyle = {
    borderColor: '#2196f3',
  };

  const acceptStyle = {
    borderColor: '#00e676',
  };

  const rejectStyle = {
    borderColor: '#ff1744',
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept, activeStyle, acceptStyle, rejectStyle, baseStyle]
  ) as any;

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <StyledDropZoneText>{text}</StyledDropZoneText>
      </div>
    </div>
  );
};
