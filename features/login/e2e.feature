Feature: E2E Dup Feature

    Background:
        Given the user is on login page

    Scenario Outline: E2E Dup with given <username> user
        Given the user enters username as "<username>" and password as "<password>"
        And clicks on login button
        Then the user should see user "<username>" logged in

        Examples:
            | username               | password       |
            | fav_user               | testingisfun99 |
            | image_not_loading_user | testingisfun99 |
            | existing_orders_user   | testingisfun99 |

    Scenario: E2E Dup as Locked User
        Given the user enters username as "locked_user" and password as "testingisfun99"
        And clicks on login button
        Then the user should see the Login Error Message "Your account has been locked."
