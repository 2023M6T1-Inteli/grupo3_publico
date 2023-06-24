import PropTypes from 'prop-types';

/**
    Component that renders the popper with the options to update or delete a machine
    @param {function} handleUpdate - function that handles the update of a machine
    @param {function} handleDelete - function that handles the delete of a machine
*/
const PopperComponent = ({handleUpdate, handleDelete}) => {
    return (
    <div className='popper'>
        <button className="options-button-type" onClick={handleDelete}>Deletar</button>
        <button className="options-button-type" onClick={handleUpdate}>Atualizar</button>
    </div>
    )
}

// Prop validation
PopperComponent.propTypes = {
    handleUpdate: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
}

export default PopperComponent;