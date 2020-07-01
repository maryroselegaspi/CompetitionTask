import React from "react";
import { Grid, Pagination } from "semantic-ui-react";

const style = {
  float: "right"
};
export class JobPagination extends React.Component {
  constructor(props) {
      super(props);

      state = {
          activePage: this.props.activePage,
          boundaryRange: 0,
          siblingRange: 0,
          showEllipsis: false,
          showFirstAndLastNav: true,
          showPreviousAndNextNav: true,
          totalPages: this.props.totalPages,
      }
  }
    render() {

        const {
            activePage,
            boundaryRange,
            siblingRange,
            showEllipsis,
            showFirstAndLastNav,
            showPreviousAndNextNav,
            totalPages,
        } = this.state

        return (
          <div>
            <Grid divided="vertically">
              <Grid.Row columns={1}>         
                <Grid.Column>
                    <Pagination
                        activePage={activePage}
                        boundaryRange={boundaryRange}
                        size='mini'
                        siblingRange={siblingRange}
                        totalPages={totalPages}

                        // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
                        ellipsisItem={showEllipsis}
                        firstItem={showFirstAndLastNav }
                        lastItem={showFirstAndLastNav }
                        prevItem={showPreviousAndNextNav}
                        onPageChange={this.props.handlePaginationChange}
                        style={style}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        );
      }
}