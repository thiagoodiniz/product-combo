import React, { useState } from 'react';
import { Button, MenuItem, TextField } from '@material-ui/core';
import { Container, AddGPDButton, TagsContainer } from './styles';
import plusIcon from '../../../assets/images/icons/plus-small.svg';

interface IGpd {
    id: string;
    label: string;
}

const gpds: IGpd[] = [
    { id: '1', label: 'Prego'},
    { id: '2', label: 'Vergalhão'},
];

export interface IGpdSkuQuantTag {
    gpd: IGpd;
    sku: string;
    quantity: string;
}

interface IGpdSkuQuantProps {
    tagList: IGpdSkuQuantTag[];
    updateTagList(newTagList: IGpdSkuQuantTag[]): void;
}

const GpdSkuQuant: React.FC<IGpdSkuQuantProps> = ({ tagList, updateTagList }) => {

    const [gpd, setGpd] = useState<IGpd>();
    const [sku, setSku] = useState('');
    const [quantity, setQuantity] = useState('');

    const onAddTag = () => {
        if(gpd && sku && quantity){
            const newTag: IGpdSkuQuantTag = { gpd, sku, quantity };
            updateTagList([...tagList, newTag]);
            setGpd(undefined);
            setSku('');
            setQuantity('');
        }
    }

    const onRemoveTag = (idx: number) => {
        document.getElementsByClassName(`tag-${idx}`)[0].classList.add('remove-tag');
        setTimeout(() => {
            document.getElementsByClassName(`tag-${idx}`)[0].classList.remove('remove-tag');
            updateTagList(tagList.filter((_, i) => i !== idx));
        }, 400);
    }

    return (
        <>
            <Container>
                <TextField
                    select
                    className="gpd-item-field"
                    label="GPD"
                    value={gpd ? gpd.id : ''}
                    onChange={(e: any) => {
                        const selectedGPD = gpds.find(item => item.id === e.target.value) as IGpd;
                        setGpd(selectedGPD)
                    }}
                >
                    {gpds.map((gpd, idx) =>
                        <MenuItem key={idx} value={gpd.id}>
                            {gpd.label}
                        </MenuItem>
                    )}
                </TextField>

                <TextField
                    className="gpd-item-field"
                    label="SKU"
                    value={sku}
                    onChange={(e: any) => setSku(e.target.value)}
                />
                <TextField
                    className="gpd-item-field"
                    label="Quantidade"
                    value={quantity}
                    onChange={(e: any) => setQuantity(e.target.value)}
                />

                <AddGPDButton onClick={onAddTag} disabled={!gpd || !sku || !quantity}>
                    <img src={plusIcon} className="plus" alt="plus button"/>
                </AddGPDButton>
            </Container>

            {   tagList.length > 0 &&
                <TagsContainer>
                    {   tagList.map((tag, idx) => 
                        <div className={`tag tag-${idx}`} key={idx}>
                            <span>{ `${tag.gpd.label} - ${tag.sku} - ${tag.quantity}` }</span>
                            <Button title="remover" onClick={() => onRemoveTag(idx)}>x</Button>    
                        </div>
                    )}
                </TagsContainer>
            }
        </>
    );
}

export default GpdSkuQuant;