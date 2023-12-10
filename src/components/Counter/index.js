import {Component} from 'react'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import './index.css'

// Constants for pagination
const totalPages = 4
const initialPage = 1

class Counter extends Component {
  // Component state to manage the current page
  state = {
    currentPage: initialPage,
  }

  // On click event increment function for changing the pages
  onIncrement = () => {
    const {onChangePage} = this.props
    const {currentPage} = this.state

    // Check if current page is less than the total pages
    if (currentPage < totalPages) {
      // Update the current page in the state and invoke the callback
      this.setState(
        prevState => ({currentPage: prevState.currentPage + 1}),
        () => onChangePage(currentPage + 1),
      )
    }
  }

  // On click event decrement function for changing the pages
  onDecrement = () => {
    const {onChangePage} = this.props
    const {currentPage} = this.state

    // Check if current page is greater than 1
    if (currentPage > 1) {
      // Update the current page in the state and invoke the callback
      this.setState(
        prevState => ({currentPage: prevState.currentPage - 1}),
        () => onChangePage(currentPage - 1),
      )
    }
  }

  // Render the Counter component
  render() {
    const {currentPage} = this.state

    return (
      <div className="pagination">
        {/* Button to navigate to the previous page */}
        <button
          type="button"
          data-testid="pagination-left-button"
          onClick={this.onDecrement}
          aria-label="Previous Page"
          className="button"
        >
          <IoIosArrowBack className="icon-class" />
        </button>
        {/* Display the current page and total pages */}
        <div className="pages-text">
          <span data-testid="active-page-number">{currentPage}</span> of{' '}
          {totalPages}
        </div>
        {/* Button to navigate to the next page */}
        <button
          type="button"
          data-testid="pagination-right-button"
          onClick={this.onIncrement}
          aria-label="Next Page"
          className="button"
        >
          <IoIosArrowForward className="icon-class" />
        </button>
      </div>
    )
  }
}

export default Counter
