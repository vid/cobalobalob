
const ScwAdmin = (props: IScwAdminProps) => { // ...same code here 
    const renderStep = (step, props) => {
        switch (step) {
            case 1: return <List {...props} />; case 2: return <ItemDetails {...props} />; // You can add case for step 3 
            default: return null;
        }
    }; return (<div className={styles.container}> {renderStep(step, { requestList, columns, _onRenderRow, onRenderDetailsHeader, onItemInvoked, headerStyle, selectedRowData, goToPreviousStep, handleApproveRejectButton, confirmationComments, context: props.context, onConfirm, selectedButton, checked })} </div>);
}; export default ScwAdmin