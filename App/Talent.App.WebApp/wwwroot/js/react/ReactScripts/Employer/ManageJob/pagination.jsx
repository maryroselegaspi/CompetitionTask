import React from "react";
import { Grid, Pagination } from "semantic-ui-react";

const style = {
  float: "right"
};
export class JobPagination extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
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
                                defaultActivePage={activePage}
                                boundaryRange={boundaryRange}                           
                                size='mini'
                                siblingRange={siblingRange}
                                totalPages={totalPages}
                                ellipsisItem={showEllipsis ? undefined : null}
                                firstItem={showFirstAndLastNav ? undefined : null}
                                lastItem={showFirstAndLastNav ? undefined : null}
                                prevItem={showPreviousAndNextNav ? undefined : null}
                                nextItem={showPreviousAndNextNav ? undefined : null}
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