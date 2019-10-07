# How to contribute

If you want to help with the development of Work Clocker, please follow the following rules.

## Reporting bugs and feature requests

* Check if the issue has already been [reported](https://github.com/Ribeiro-Tiago/work-clocker/issues). (including closed tickets).
* Create a ticket for your issue.
* Describe the issue clearly and succinctly.
* In case of bug reports:
  * describe the steps required to reproduce issue,
  * attach a [backtrace](http://en.wikipedia.org/wiki/Stack_trace) if you have any,
  * post details about your setup:
    * application version,
    * system version
    * platform you were running and it's specifications

## New features or fixes

* Fork the repository on GitHub.
* Create your feature branch (git checkout -b my-new-feature)
* Commit your changes (git commit -am 'Add some feature')
* Push to the branch (git push origin my-new-feature)
* Create new Pull Request
* Patiently wait for the review.

## Coding rules

* Use TSLint with the configurations included in the project
* Indentation always tabs over spaces
* Use **const** for every variable whose value doesn't change (array items and object properties don't count), otherwise use **let**
