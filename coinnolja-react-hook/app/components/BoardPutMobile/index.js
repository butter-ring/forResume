/**
 *
 * BoardPutMobile
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

// import classNames from 'classnames';
import request from 'utils/request';
import { Link } from 'react-router-dom';

import PhotoCamera from '@material-ui/icons/PhotoCamera';
import LinearProgress from '@material-ui/core/LinearProgress';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    paddingTop: theme.spacing(0),
  },

  button: {
    marginTop: 76,
    maxWidth: 244,
    width: '100%',
  },
  blue: {
    fontWeight: 'bold',
    color: '#4d85f1',
  },
  buttonEditor: {
    padding: 2,
    fontWeight: 'bold',
    paddingLeft: 4,
    paddingRight: 4,
    minWidth: 40,
    marginRight: 4,
    marginBottom: 8,
  },
  buttonEditorActive: {
    // backgroundColor: '#4d85f1',
    // color: '#ffffff',
  },
  grid: {
    marginTop: 4,
  },
  fileInput: {
    display: 'none',
  },
  inputLink: {
    // backgroundColor: '#f1f1f1',
    padding: theme.spacing(1),
    // maxWidth: 550,
    width: '100%',
  },
  imageLinkError: {
    color: '#f05c5c',
    margin: 0,
  },
  inputTitle: {
    padding: theme.spacing(1),
    width: '100%',
    border: 'solid 1px #ddd',
  },
  inputTitleWrap: {
    marginBottom: 20,
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  editorWrap: {
    border: 'solid 1px #ddd',
    paddingLeft: 10,
    paddingRight: 10,
  },
  link: {
    textDecoration: 'none',
    userSelect: 'none',
  },
  buttonCancel: {
    marginTop: 76,
    marginRight: 10,
    maxWidth: 100,
  },
  formControl: {
    width: '30%',
    marginRight: 5,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginBottom: 10,
    },
  },
  notchedOutline: {
    borderRadius: 0,
  },
  textArea: {
    width: '100%',
    resize: 'none',
    padding: 15,
    border: 'solid 1px #dedede',
  },
  imageWrap: {
    display: 'flex',
  },
  buttonDelete: {
    marginLeft: 8,
    maxWidth: 80,
  },
  imageTitle: {
    flex: 1,
    fontSize: 12,
    // marginLet: 8,
  },
  image: {
    marginRight: 8,
  },
  warnText: {
    color: 'orange',
  },
}));

function BoardPutMobile({ match, history, isSignin, boardMaster, board }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [inputKey, setInputKey] = useState();
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState(false);
  const [contentImageError, setContentImageError] = useState(false);
  // const [boardMaster, setBoardMaster] = useState(false);
  const [titleHead, setTitleHead] = useState('');
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    if (board) {
      setTitle(board.title);
      setContent(board.content);
      setTitleHead(board.titleHead);
      if (board.mediaCollections) {
        if (board.mediaCollections.length > 0) {
          const initData = [];
          for (let i = 0; i < board.mediaCollections.length; i += 1) {
            initData.push(board.mediaCollections[i].fullPath);
          }
          setImageList(initData);
        }
      }
    }
  }, [board]);
  const handleSubmit = async () => {
    if (!isSignin) {
      return false;
    }
    const titleValid = Boolean(title);
    if (!titleValid) {
      setTitleError(true);
      return false;
    }
    setTitleError(false);

    const contnetValid = Boolean(content);
    if (!contnetValid) {
      setContentError(true);
      return false;
    }
    if (!content) {
      setContentError(true);
      return false;
    }
    setContentError(false);
    if (match.params.boardType === 'GALLERY') {
      if (imageList.length < 1) {
        setContentImageError(true);
        return false;
      }
    }
    setContentImageError(false);
    // console.log(event.target);
    let result;
    try {
      setLoading(true);

      const options = {
        method: 'POST',
        data: {
          title,
          content,
          titleHead,
          // boardMasterId: match.params.boardMasterId,
          imageList,
        },
        auth: true,
      };
      result = await request(`/api/board/put/${match.params.boardId}`, options);
    } catch (err) {
      console.log(err);
      alert(err.data);
    } finally {
      setInputKey(Math.random().toString(36));
      setLoading(false);
    }
    if (result) {
      if (result.data) {
        history.push(`/board/${match.params.boardMasterId}`);
      }
    }
    return true;
  };

  const handleAppend = async event => {
    if (loading) {
      return false;
    }
    const imageFile = event.target.files;
    if (imageFile && isSignin) {
      if (imageFile.length > 0) {
        try {
          setLoading(true);
          const data = new FormData();
          data.append('media', imageFile[0]);
          const options = {
            method: 'POST',
            data,
            auth: true,
            multipart: true,
          };
          const result = await request(`/api/mediacollection`, options);
          if (result) {
            if (result.data) {
              setImageList(imageList.concat(result.data));
            }
          }
          setInputKey(Math.random().toString(36));
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    }
    return false;
  };
  const handleDelete = index => {
    // console.log(index);
    const newContents = JSON.parse(JSON.stringify(imageList));
    newContents.splice(index, 1);
    setImageList(newContents);
  };

  return (
    <div className="RichEditor-root">
      <div className={classes.inputTitleWrap}>
        {boardMaster && boardMaster.subCategorys && (
          <FormControl variant="outlined" className={classes.formControl}>
            {/* <InputLabel htmlFor="outlined-age-simple">분류</InputLabel> */}
            <Select
              value={titleHead}
              onChange={e => setTitleHead(e.target.value)}
              displayEmpty
              input={
                <OutlinedInput
                  // labelWidth={state.labelWidth}
                  name="gender"
                  id="outlined-age-simple"
                  classes={{
                    // root: classes.outlinedInput,
                    notchedOutline: classes.notchedOutline,
                  }}
                />
              }
              classes={{
                root: classes.selectRoot,
                selectMenu: classes.selectMenu,
                outlined: classes.outlined,
              }}
            >
              <MenuItem value="">
                <span className={classes.selectNoneTest}>분류</span>
              </MenuItem>
              {boardMaster.subCategorys.length > 0 &&
                boardMaster.subCategorys.map(sub => (
                  <MenuItem value={sub}>{sub}</MenuItem>
                ))}
              {/* <MenuItem value="MALE">남자</MenuItem>
          <MenuItem value="FEMALE">여자</MenuItem> */}
            </Select>
          </FormControl>
        )}

        <input
          type="text"
          className={classes.inputTitle}
          maxLength="200"
          max="200"
          placeholder="제목을 입력해 주세요"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        {titleError && (
          <p className={classes.imageLinkError}>※ 제목을 입력해 주세요.</p>
        )}
      </div>

      <div role="presentation">
        <textarea
          rows="4"
          className={classes.textArea}
          placeholder="내용을 입력해주세요."
          maxLength="500"
          onChange={e => setContent(e.target.value)}
          value={content}
        />
      </div>
      {contentError && (
        <p className={classes.imageLinkError}>※ 내용을 입력해 주세요.</p>
      )}
      {contentImageError && (
        <p className={classes.imageLinkError}>※ 이미지를 첨부시켜주세요.</p>
      )}
      {/* <button onClick={handleClick}>Insert an image</button> */}
      <div>
        <p className={classes.warnText}>
          * 글 수정시 PC에서 작성하신 HTML태그가 삭제됩니다. PC에서 작성한 글은
          PC에서 수정하는 것을 권장합니다.
        </p>
        {loading && <LinearProgress />}
        <input
          accept="image/*"
          className={classes.fileInput}
          id="contained-button-imgfile"
          type="file"
          onChange={handleAppend}
          key={inputKey || ''}
        />
        <label htmlFor="contained-button-imgfile">
          <Button
            variant="contained"
            color="default"
            component="span"
            className={classes.buttonEditor}
            disabled={loading}
            // onClick={handleImagePop}
          >
            <PhotoCamera />
          </Button>
        </label>
      </div>
      <div>
        {imageList &&
          imageList.length > 0 &&
          imageList.map((row, idx) => (
            <div className={classes.imageWrap}>
              <div className={classes.image}>
                <img src={row} alt="" width="40" height="40" />
              </div>
              <div className={classes.imageTitle}>{row.substring(76)}</div>
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.buttonDelete}
                  onClick={() => handleDelete(idx)}
                >
                  삭제
                </Button>
              </div>
            </div>
          ))}
      </div>
      <Link
        to={`/board/${match.params.boardMasterId}`}
        className={classes.link}
      >
        <Button
          variant="contained"
          color="secondary"
          className={classes.buttonCancel}
          // onClick={handleSubmit}
        >
          취소
        </Button>
      </Link>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
      >
        저장하기
      </Button>
    </div>
  );
}

BoardPutMobile.propTypes = {
  match: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
  isSignin: PropTypes.any,
  boardMaster: PropTypes.any,
  board: PropTypes.any,
};

export default BoardPutMobile;
