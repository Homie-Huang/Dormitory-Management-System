//! 頁面
const express = require('express');
const token = require("../controllers/token.js");
const db = require('../model/database');
const router = express.Router();

const readBulletin = require('../model/bulletinRead');
const readMessage = require('../model/messageRead');

const getManager = require('../model/visitor/getManager');
const getSupervisor = require('../model/visitor/getSupervisor');

const getViolation = require('../model/student/getViolation');
const getDormitory = require('../model/student/getDormitory');
const getEquipment = require('../model/student/getEquipment');
const getSelfDormitoryInfo = require('../model/student/getSelfDormitoryInfo');


const visitorGetManager = require('../model/visitor/getManager');
const visitorGetSupervisor = require('../model/visitor/getSupervisor');


//* 進入首頁view
router.get('/', token, (req, res) => {
    if (req.user.Permission == 1) {
        return res.render('home_manager');
    }
    else if (req.user.Permission == 0) {
        return res.render('home_student');
    }
    else if (req.user.Permission == 2) {
        return res.render('home_supervisor');
    }
});

//* 進入註冊頁面view
/*
router.get('/register', (req, res) => {
    res.render('register');
});
*/

//* 進入登入頁面view
router.get('/login', (req, res) => {
    res.render('login');
});

//* 進入修改密碼頁面view
router.get('/change_password', (req, res) => {
    res.render('change_password');
});

//* 進入忘記密碼頁面view
router.get('/forget_password', (req, res) => {
    res.render('forget_password');
});

router.get('/reset_password', (req, res) => {
    res.render('reset_password');
});
router.get('/add_student_account', token, (req, res) => {
    if (req.user.Permission) {
        res.render('add_student_account');
    }
});
router.get('/add_manager_account', token, (req, res) => {
    if (req.user.Permission) {
        res.render('add_manager_account');
    }
});
router.get('/add_supervisor_account', token, (req, res) => {
    if (req.user.Permission) {
        res.render('add_supervisor_account');
    }
});

//! Manager
router.get('/modify_account', token, (req, res) => {
    if (req.user.Permission) {
        res.render('modify_account');
    }
});

router.get('/manager_to_student', token, (req, res) => {
    if (req.user.Permission) {
        res.render('manager_to_student');
    }
});
router.get('/manager_to_supervisor', (req, res) => {
    getSupervisor().then(result => {
        return res.render('manager_to_supervisor', {
            message: result
        })
    })
});


router.get('/manager_to_apply', token, (req, res) => {
    if (req.user.Permission) {
        res.render('manager_to_apply');
    }
});

router.get('/manager_to_dormitory', token, (req, res) => {
    getDormitory(req).then(result => {
        if (req.user.Permission) {
            return res.render('manager_to_dormitory', {
                Dormessage: result
            })
        }
    })
});
router.get('/manager_change_dormitory', token, (req, res) => {
    getDormitory(req).then(result => {
        if (req.user.Permission) {
            return res.render('manager_change_dormitory', {
                Dormessage: result
            })
        }
    })
});
router.get('/manager_checkout_dormitory', token, (req, res) => {
    if (req.user.Permission) {
        res.render('manager_checkout_dormitory');
    }
});
router.get('/manager_equipment', token, (req, res) => {
    getDormitory(req).then(result => {
        if (req.user.Permission) {
            return res.render('manager_equipment', {
                Dormessage: result
            })
        }
    })
});
router.get('/manager_studentAccommodation', token, (req, res) => {
    getDormitory(req).then(result => {
        if (req.user.Permission) {
            return res.render('manager_studentAccommodation', {
                Dormessage: result
            })
        }
    })
});
router.get('/manager_checkout_dormitory', token, (req, res) => {
    getDormitory(req).then(result => {
        if (req.user.Permission) {
            return res.render('manager_checkout_dormitory', {
                Dormessage: result
            })
        }
    })
});

router.get('/manager_fix', token, (req, res) => {
    if (req.user.Permission) {
        res.render('manager_fix');
    }
});





router.get('/manager_to_message', token, (req, res) => {
    if (req.user.Permission) {
        readBulletin().then(Bresult => {
            readMessage().then(Mresult => {
                return res.render('manager_to_message', {
                    Bmessage: Bresult,
                    Mmessage: Mresult,
                });

            })
        })
    }
});


//! Visitor
router.get('/home_visitor', (req, res) => {
    res.render('home_visitor');
});
router.get('/visitor_to_supervisor', (req, res) => {
    visitorGetSupervisor().then(result => {
        return res.render('visitor_to_supervisor', {
            message: result
        })
    })
});
router.get('/visitor_to_manager', (req, res) => {
    visitorGetManager().then(result => {
        return res.render('visitor_to_manager', {
            message: result
        })
    })
});

router.get('/visitor_to_reservation', (req, res) => {
    res.render('visitor_to_reservation');
});

router.get('/visitor_dormitory_detail', (req, res) => {
    res.render('visitor_dormitory_detail');
});


//! supervisor
router.get('/supervisor_equipment', token, (req, res) => {
    getDormitory(req).then(result => {
        if (req.user.Permission) {
            return res.render('supervisor_equipment', {
                Dormessage: result
            })
        }
    })
});
router.get('/other_supervisor', token, (req, res) => {
    getSupervisor().then(result => {
        return res.render('other_supervisor', {
            message: result
        })
    })
});
router.get('/other_manager', token, (req, res) => {
    getSupervisor().then(result => {
        return res.render('other_manager', {
            message: result
        })
    })
});


router.get('/supervisor_fix', token, (req, res) => {
    if (req.user.Permission) {
        res.render('supervisor_fix');
    }
});

router.get('/supervisor_to_studentAccommodation', token, (req, res) => {
    if (req.user.Permission) {
        res.render('supervisor_to_studentAccommodation');
    }
});

router.get('/supervisor_to_dormitory', token, (req, res) => {
    getDormitory(req).then(result => {
        if (req.user.Permission) {
            return res.render('supervisor_to_dormitory', {
                Dormessage: result
            })
        }
    })
});

router.get('/supervisor_to_manager', token, (req, res) => {
    getManager().then(result => {
        if (req.user.Permission) {
            return res.render('student_to_manager', {
                message: result
            })
        }
    })
});


router.get('/supervisor_to_message', token, (req, res) => {
    if (req.user.Permission) {
        readBulletin().then(Bresult => {
            readMessage().then(Mresult => {
                return res.render('supervisor_to_message', {
                    Bmessage: Bresult,
                    Mmessage: Mresult,
                });
            })
        })
    }
});

router.get('/supervisor_to_student', token, (req, res) => {
    if (req.user.Permission) {
        res.render('supervisor_to_student');
    }
});

router.get('/supervisor_to_violation', token, (req, res) => {
    if (req.user.Permission) {
        res.render('supervisor_to_violation');
    }
});

//! Student
router.get('/student_to_manager', token, (req, res) => {
    getManager().then(result => {
        if (!req.user.Permission) {
            return res.render('student_to_manager', {
                message: result
            })
        }
    })
});
router.get('/studentAccommodation', token, (req, res) => {
    getSelfDormitoryInfo(req).then(result => {
        if (!req.user.Permission) {
            return res.render('studentAccommodation', {
                message: result
            })
        }
    })
});

router.get('/student_to_supervisor', token, (req, res) => {
    getSupervisor().then(result => {
        if (!req.user.Permission) {
            return res.render('student_to_supervisor', {
                message: result
            })
        }
    })
});

router.get('/student_change_dormitory', token, (req, res) => {
    getDormitory(req).then(result => {
        if (!req.user.Permission) {
            return res.render('student_change_dormitory', {
                message: result
            })
        }
    })
});
router.get('/student_checkout_dormitory', token, (req, res) => {
    getDormitory(req).then(result => {
        if (!req.user.Permission) {
            return res.render('student_checkout_dormitory', {
                message: result
            })
        }
    })
});

router.get('/student_to_dormitory', token, (req, res) => {
    getDormitory(req).then(result => {
        if (!req.user.Permission) {
            return res.render('student_to_dormitory', {
                Dormessage: result
            })
        }
    })
});

router.get('/student_to_violation', token, (req, res) => {
    getViolation(req).then(result => {
        if (!req.user.Permission) {
            return res.render('student_to_violation', {
                message: result
            })
        }
    })
});

router.get('/student_fix', token, (req, res) => {
    getEquipment(req).then(result => {
        if (!req.user.Permission) {
            return res.render('student_fix', {
                message: result,
                searchSQL: sql
            })
        }
    })
});

router.get('/dormitory_detail', token, (req, res) => {
    res.render('dormitory_detail');
});

router.get('/student_to_message', token, (req, res) => {
    if (!req.user.Permission) {
        readBulletin().then(Bresult => {
            readMessage().then(Mresult => {
                return res.render('student_to_message', {
                    Bmessage: Bresult,
                    Mmessage: Mresult,
                });
            })
        })
    }
});

//* 建立module並export，導出建立好的router
module.exports = router;