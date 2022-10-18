# Quality Management Plan

| **QMP**                      |              |     |
| ---------------------------- | ------------ | --- |
| **Project Name**             | Threewide    |     |
| **Quality Standard**         |              |     |
| \[List\]                     |              |     |
| **Category**                 | **Standard** |     |
| \[Assurance, control, role\] |              |     |
|                              |              |     |

## Quality Assurance

GitHub project boards will be used to track project progress and link dev/test activities to user stories for each MVP. Due to the nature of the project boards, they can be linked together through Pull Requests(PRs) to ensure that the [dev work](https://github.com/orgs/teamcrusher/projects/2) satisfies the [User Stories](https://github.com/orgs/teamcrusher/projects/4). All supporting activities will be tracked on the [Main Project Board](https://github.com/orgs/teamcrusher/projects/3). These supporting activities make up the course deliverables as outlined in [Activity 2 Overview](/PM%20documentation/README.md).

At the begining of each activity going forward, a new overview will be created and captured on the [Main Project Board](https://github.com/orgs/teamcrusher/projects/3) with an accompanying Milestone. Additional Milestones will capture the progress and QA requirements of each MVP as per the [User Stories](https://github.com/orgs/teamcrusher/projects/4).

## Quality Control

- main branch is protected, actions required to push to main
  - open a pull request
  - have at least one reviewer(s) approve pull request
  - merge to main
  - close issue and PR

### On Merge & Close

- ensure all conversations are resolved or pushed to new issue/PR
- delete old branch branch

## Quality Roles & Responsibilites

| **QMP**          |                        |                                                                               |
| ---------------- | ---------------------- | ----------------------------------------------------------------------------- |
| **Project Name** | Threewide              |                                                                               |
| **Role**         | **Assignees\***        | **Description**                                                               |
| Scrum Master     | Ben                    | Bypass branch protections                                                     |
| Code Owner       | Ben, Dan, David, Tirth | Responsible for writing code and checking reviewers comments                  |
| Reviewer         | Ben, Dan, David, Tirth | Responsible for reviewing all assigned PRs, can add additional commits to PRs |

\* assigned on a per task basis within an Issue or PR
