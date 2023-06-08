import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn, ScrollablePane, ScrollbarVisibility } from '@fluentui/react/lib/DetailsList';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { ActionButton, IIconProps } from '@fluentui/react/lib/Button';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react/lib/Stack';
import { IScwAdminProps } from './IScwAdminProps';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './ScwAdmin.module.scss';
import { sp } from "@pnp/sp/presets/all";
import ItemFormDetails from './ItemFormDetails';
import { IScwAdminState } from './IScwAdminState';
import { TextField } from '@fluentui/react/lib/TextField';
import { Label } from '@fluentui/react/lib/Label';

// Icons for back button and the approve/reject buttons
const arrowIcon: IIconProps = { iconName: 'Back' };
const acceptIcon: IIconProps = { iconName: 'Accept' };

// Styles for stack component
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const sectionStackTokens: IStackTokens = { childrenGap: 10 };

const scrollablePaneStyles = { root: { height: '80vh', position: 'relative', maxHeight: 'inherit' } };

const headerStyle = { root: { marginTop: '15px' } };

// Sub-components
const List = ({ requestList, columns, _onRenderRow, onRenderDetailsHeader, onItemInvoked }) => (
    <>
        <h2>SCW Approvals</h2>
        <h3>Total Items {requestList.length}</h3>
        <div className={styles.wrapper} data-is-scrollable="true">
            <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto} styles={scrollablePaneStyles}>
                <DetailsList
                    styles={headerStyle}
                    items={requestList}
                    columns={columns}
                    layoutMode={DetailsListLayoutMode.justified}
                    onRenderRow={_onRenderRow}
                    isHeaderVisible={true}
                    onRenderDetailsHeader={onRenderDetailsHeader}
                    onItemInvoked={onItemInvoked}
                />
            </ScrollablePane>
        </div>
    </>
);

const ItemDetails = ({ selectedRowData, goToPreviousStep, handleApproveRejectButton, confirmationComments, context, onConfirm, selectedButton, checked }) => (
    <>
        <ActionButton text="Back to list" iconProps={arrowIcon} style={{ float: 'right' }} onClick={goToPreviousStep} />
        <ItemFormDetails selectedRowData={selectedRowData} confirmationComments={confirmationComments} context={context} />
        {selectedRowData.status === 'Submitted' ?
            <Stack horizontal horizontalAlign='center' tokens={sectionStackTokens} styles={stackStyles}>
                <PrimaryButton id={'btn_1'} text={'Approve'} onClick={handleApproveRejectButton} iconProps={checked && selectedButton === 'Approve' ? acceptIcon : null} />
                <PrimaryButton id={'btn_2'} text={'Reject'} onClick={handleApproveRejectButton} iconProps={checked && selectedButton === 'Reject' ? acceptIcon : null} />
            </Stack>
            :
            null
        }
        <PrimaryButton text="Confirm" disabled={!checked} onClick={onConfirm} />
    </>
);

export default class ScwAdmin extends React.Component<IScwAdminProps, IScwAdminState> {
    state: IScwAdminState = {
    }

    componentDidMount() {
        this.getList();
    }
    
    getList = async () => {
    }

    render() {
        const { requestList, columns, _onRenderRow, onRenderDetailsHeader, onItemInvoked, selectedRowData, goToPreviousStep, handleApproveRejectButton, confirmationComments, context, onConfirm, selectedButton, checked } = this;

        return (
            <div className={styles.scwAdmin}>
                <div className={styles.container}>
                    {
                        !selectedRowData
                            ? <List requestList={requestList} columns={columns} _onRenderRow={_onRenderRow} onRenderDetailsHeader={onRenderDetailsHeader} onItemInvoked={onItemInvoked} />
                            : <ItemDetails selectedRowData={selectedRowData} goToPreviousStep={goToPreviousStep} handleApproveRejectButton={handleApproveRejectButton} confirmationComments={confirmationComments} context={context} onConfirm={onConfirm} selectedButton={selectedButton} checked={checked} />
                    }
                </div>
            </div>
        );
    }
}