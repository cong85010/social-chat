import styled, { css } from 'styled-components';
import { itemHover, textAbout } from './color';

//Icon
export const HeaderIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    margin-left: 5px;
    width: 32px;
    height: 32px;
    background-color: transparent;
    transition: 0.5 ease;
    &:hover {
        cursor: pointer;
        border-radius: 4px;
        background-color: ${itemHover};
    }
    svg {
        width: 20px;
        height: 20px;
        color: #394e60;
    }
`;

// Content Avarat
export const ItemContent = styled.div`
    margin-right: 16px;
    cursor: pointer;
`;

export const ContentAbout = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14;
    color: ${textAbout};
`;

// FullName
export const ContentName = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    font-style: bold;
`;

/* Footer Chat */
export const IconItemInput = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    margin-left: 5px;
    width: 40px;
    height: 40px;
    background-color: transparent;
    transition: 0.5 ease;
    margin-right: 8px;

    &:hover {
        cursor: pointer;
        border-radius: 4px;
        background-color: ${itemHover};
    }
    svg {
        width: 24px;
        height: 24px;
        color: #394e60;
    }
`;
