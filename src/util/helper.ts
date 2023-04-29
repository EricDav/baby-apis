import { HttpException, HttpStatus } from "@nestjs/common";

export const HOME = '1';
export const AWAY = '2';
export const DRAW = 'X';
export const HOME_DRAW = '1X';
export const AWAY_DRAW = 'X2';
export const OVER_2_POINT_5 = 'Over 2.5';
export const UNDER_2_POINT_5 = 'Under 2.5';
export const GOAL_GOAL = 'GG';
export const NO_GOAL_GOAL = 'NG';
export const ANY_BODY_WIN = '12';
export const OVER_1_POINT_5 = 'Over 1.5';
export const UNDER_1_POINT_5 = 'Under 1.5';
export const OVER_3_POINT_5 = 'Over 3.5';
export const UNDER_3_POINT_5 = 'Under 3.5';
export const getFormPoint = (form) => {
    const outcomes = form.split('');
    let point = 0;
    const outMapping = {
        'W': 2,
        'D': 1,
        'L': 0
    }

    outcomes.forEach((out) => {
        if (outMapping[out]) {
            point+=outMapping[out];
        }
    });

    return point;
}

/**
    * This method evaluate an option given a result 
    * 
    * for instance lets say the result is 2 - 0 and option GG 
    * the method will return false because the result doesn't 
    * evaluate to GG
    * 
    * @result is a string seperated by -
    * 
    * @return boolean true | false
*/
 export const  evaluate = (result, option) =>  {


    const resultArray = result.split('-');
    const homeGoal = Number.parseInt(resultArray[0]);
    const awayGoal = Number.parseInt(resultArray[1]);
    switch (option) {
        case HOME:
            if (homeGoal > awayGoal) {
                return true;
            }
            return false;

        case AWAY:
            if (awayGoal > homeGoal) {
                return true;
            }
            return false;

        case DRAW:
            if (awayGoal == homeGoal) {
                return true;
            }
            return false;

        case HOME_DRAW:
            if (homeGoal >= awayGoal) {
                return true;
            }
            return false;
        
        case AWAY_DRAW:
            if (awayGoal >= homeGoal) {
                return true;
            }
            return false;
        
        case OVER_2_POINT_5:
            if ((awayGoal + homeGoal) > 2) {
                return true;
            }
            return false;

        case UNDER_2_POINT_5:
            if ((awayGoal + homeGoal) < 3) {
                return true;
            }
            return false;
        
        case GOAL_GOAL:
            if (awayGoal > 0 && homeGoal > 0) {
                return true;
            }
            return false;

        case NO_GOAL_GOAL:
            if (awayGoal == 0 || homeGoal == 0) {
                return true;
            } 
            return false;
        
        case ANY_BODY_WIN:
            if (awayGoal > homeGoal || homeGoal > awayGoal) {
                return true;
            } 
            return false;
        
        case OVER_1_POINT_5:
            if ((awayGoal + homeGoal) > 1) {
                return true;
            }
            return false;

        case UNDER_3_POINT_5:
            if ((awayGoal + homeGoal) < 4) {
                return true;
            }
            return false;
    }
}

export const handleErrorCatch = (err) => {
    if (
      err.status === HttpStatus.NOT_FOUND ||
      err.status === HttpStatus.BAD_REQUEST ||
      err.status === HttpStatus.UNAUTHORIZED
    ) {
      throw new HttpException(
        {
          status: err.status,
          error: err.response.error,
        },
        err.status,
      );
    }
    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `An error occured with the message: ${err.message}`,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
};