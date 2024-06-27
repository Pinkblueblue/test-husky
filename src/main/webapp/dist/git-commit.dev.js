"use strict";

var _inquirer = _interopRequireDefault(require("inquirer"));

var _child_process = require("child_process");

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var index = 1;
/**
 * 1. commit type
 * 2. check your jira number
 * 3. if the jira number is wrong, input you jira number:(like: C171405-6765)
 * 4. input your commit message
 * 5. confirm your whole commit message, enter  or update
 *
 * 这个应该要强制，用方括号包起来，来获取jira号，
 * 获取git branch中的jira号，如果用户确认了jira号，那就用等号做判断
 * 如果用户手输了jira号，就用branch name includes来判断
 */

var getCommitType = function getCommitType() {
  return new Promise(function _callee(resolve, reject) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _inquirer["default"].prompt([{
              type: "list",
              name: "type",
              message: "select commit type in message:",
              choices: ["fix", "test", "config", "feat"],
              "default": "fix",
              prefix: index++ + ")"
            }]).then(function (res) {
              // console.log(res.type);
              resolve(res.type);
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  });
};

var getJiraNumber = function getJiraNumber() {
  return Promise.resolve("C171405B-2323");
};

var checkJiraNumber = function checkJiraNumber(jiraNumber) {
  return regeneratorRuntime.async(function checkJiraNumber$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", new Promise(function _callee2(resolve, reject) {
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _inquirer["default"].prompt([{
                      type: "confirm",
                      name: "isRight",
                      message: "Is your jira number [".concat(_chalk["default"].green(jiraNumber), "]?"),
                      "default": true,
                      prefix: index++ + ")"
                    }]).then(function (res) {
                      // console.log(res);
                      resolve(res.isRight);
                    });

                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var inputJiraNumber = function inputJiraNumber() {
  return regeneratorRuntime.async(function inputJiraNumber$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", new Promise(function _callee3(resolve, reject) {
            return regeneratorRuntime.async(function _callee3$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _inquirer["default"].prompt([{
                      type: "input",
                      name: "jiraNumber",
                      message: "Please input you jira number:",
                      validate: function validate(value) {
                        if (!value.trim()) {
                          return "jira number not be empty!";
                        } else if (!/^(C|c)/.test(value.trim())) {
                          return "jira number must start with 'C|c'";
                        }

                        return true;
                      },
                      prefix: index++ + ")"
                    }]).then(function (res) {
                      // console.log(res);
                      resolve(res.jiraNumber);
                    })["catch"](function () {
                      console.log("error");
                      reject(null);
                    });

                  case 1:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          }));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var inputMessage = function inputMessage() {
  return new Promise(function _callee4(resolve, reject) {
    return regeneratorRuntime.async(function _callee4$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _inquirer["default"].prompt([{
              type: "input",
              name: "message",
              message: "Please input commit message: ",
              validate: function validate(value) {
                if (!value.trim()) {
                  return "message not be empty!";
                }

                return true;
              },
              prefix: index++ + ")"
            }]).then(function (res) {
              // console.log(res);
              resolve(res.message);
            });

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
};

var confirmMessage = function confirmMessage(message) {
  return new Promise(function _callee5(resolve, reject) {
    return regeneratorRuntime.async(function _callee5$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _inquirer["default"].prompt([{
              type: "confirm",
              name: "isMessageOk",
              message: "The whole message is '".concat(_chalk["default"].green(message), "', is it ok?"),
              "default": true,
              prefix: index++ + ")"
            }]).then(function (res) {
              // console.log(res);
              resolve(res.isMessageOk);
            });

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    });
  });
};

var editMessage = function editMessage(wholeMessage) {
  return new Promise(function _callee6(resolve, reject) {
    return regeneratorRuntime.async(function _callee6$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _inquirer["default"].prompt([{
              type: "editor",
              name: "updateMessage",
              message: "Let's edit the commit message:",
              "default": wholeMessage,
              validate: function validate(value) {
                if (!value.trim()) {
                  return "message not be empty!";
                }

                return true;
              },
              prefix: index++ + ")"
            }]).then(function (res) {
              // console.log(res);
              resolve(res.updateMessage);
            });

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    });
  });
};

function gitCommit() {
  var type, jiraNumber, isRight, message, wholeMessage, isMessageOk;
  return regeneratorRuntime.async(function gitCommit$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(getCommitType());

        case 3:
          type = _context9.sent;
          _context9.next = 6;
          return regeneratorRuntime.awrap(getJiraNumber());

        case 6:
          jiraNumber = _context9.sent;
          _context9.next = 9;
          return regeneratorRuntime.awrap(checkJiraNumber(jiraNumber));

        case 9:
          isRight = _context9.sent;

          if (!(isRight == false)) {
            _context9.next = 14;
            break;
          }

          _context9.next = 13;
          return regeneratorRuntime.awrap(inputJiraNumber());

        case 13:
          jiraNumber = _context9.sent;

        case 14:
          _context9.next = 16;
          return regeneratorRuntime.awrap(inputMessage());

        case 16:
          message = _context9.sent;
          wholeMessage = "".concat(type, ": [").concat(jiraNumber, "] ").concat(message);
          _context9.next = 20;
          return regeneratorRuntime.awrap(confirmMessage(wholeMessage));

        case 20:
          isMessageOk = _context9.sent;

          if (isMessageOk) {
            _context9.next = 25;
            break;
          }

          _context9.next = 24;
          return regeneratorRuntime.awrap(editMessage(wholeMessage));

        case 24:
          wholeMessage = _context9.sent;

        case 25:
          execGitCommit(wholeMessage);
          _context9.next = 31;
          break;

        case 28:
          _context9.prev = 28;
          _context9.t0 = _context9["catch"](0);
          console.error(_context9.t0);

        case 31:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 28]]);
}

function execGitCommit(wholeMessage) {
  console.log("\n\n", _chalk["default"].blue("RUN >>"), _chalk["default"].green("git commit -m '".concat(wholeMessage, "'"), "\n\n"));
  var command = "git commit -m \"".concat(wholeMessage.replace(/"/g, ""), "\"");
  (0, _child_process.exec)(command, function (err, stdout, stderr) {
    if (err) {
      console.error(err);
      return;
    }

    if (stderr) {
      console.error(stderr);
      return;
    }

    console.log(stdout);
  });
}

gitCommit();