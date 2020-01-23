/**
 *
 * BoardPutPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import classNames from 'classnames';
import request from 'utils/request';
import { Link } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import SigninRequired from 'components/SigninRequired';
import { makeSelectSignin } from 'containers/App/selectors';
import {
  // Editor,
  AtomicBlockUtils,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  // convertFromHTML,
  // ContentState,
  // convertFromRaw,
} from 'draft-js';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';

import { stateToHTML } from 'draft-js-export-html';
import createImagePlugin from 'draft-js-image-plugin';
// import { convertFromHTML } from 'draft-convert';
import { stateFromHTML } from 'draft-js-import-html';

import Grid from '@material-ui/core/Grid';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PhotoAlbum from '@material-ui/icons/PhotoAlbum';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import LinearProgress from '@material-ui/core/LinearProgress';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import BoardPutMobile from 'components/BoardPutMobile';
import makeSelectBoardPutPage from './selectors';
import reducer from './reducer';
import saga from './saga';

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();

const imagePlugin = createImagePlugin({
  decorator: composeDecorators(
    resizeablePlugin.decorator,
    focusPlugin.decorator,
  ),
});

const plugins = [focusPlugin, resizeablePlugin, imagePlugin];

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
    paddingLeft: 4,
    paddingRight: 4,
    fontWeight: 'bold',
    minWidth: 40,
    marginRight: 4,
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
  imageWrap: {
    display: 'flex',
    paddingTop: 8,
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
}));

export function BoardPutPage({ match, history, isSignin }) {
  useInjectReducer({ key: 'boardPutPage', reducer });
  useInjectSaga({ key: 'boardPutPage', saga });
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  );

  const [className, setClassName] = useState('RichEditor-editor');
  const [imagePop, setImagePop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputKey, setInputKey] = useState();
  const [imageLink, setImageLink] = useState('');
  const [imageLinkError, setImageLinkError] = useState(false);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [contentImageError, setContentImageError] = useState(false);
  const [boardMaster, setBoardMaster] = useState(false);
  const [titleHead, setTitleHead] = useState('');
  const [board, setBoard] = useState(false);
  const [imageList, setImageList] = useState([]);

  const editor = React.useRef(null);

  function focusEditor() {
    if (matches) {
      return false;
    }
    let classNameNext = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        classNameNext += ' RichEditor-hidePlaceholder';
      }
    }
    setClassName(classNameNext);
    editor.current.focus();
    return true;
  }

  function handleKeyCommand(command, editorStateNext) {
    const newState = RichUtils.handleKeyCommand(editorStateNext, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  const mapKeyToEditorCommand = e => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return false;
    }
    return getDefaultKeyBinding(e);
  };

  const toggleBlockType = blockType => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = inlineStyle => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };
  useEffect(() => {
    if (isSignin) {
      focusEditor();
      setInitData();
    }
  }, []);

  const insertImage = (editorStatePrev, base64) => {
    const contentState = editorStatePrev.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'image',
      'IMMUTABLE',
      { src: base64 },
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorStatePrev, {
      currentContent: contentStateWithEntity,
    });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
  };

  const handleImagePop = () => {
    setImageLinkError(false);
    setImageLink('');
    setImagePop(true);
  };
  const handleImagePopClose = () => {
    setImageLinkError(false);
    setImageLink('');
    setImagePop(false);
  };
  const handleImagePopSubmit = () => {
    if (!imageLink.startsWith('http://') && !imageLink.startsWith('https://')) {
      setImageLinkError(true);
      return false;
    }
    setImageLinkError(false);
    const newEditorState = insertImage(editorState, imageLink);
    setEditorState(newEditorState);
    setImageLink('');
    setImagePop(false);
    return true;
  };
  const handleAppend = async event => {
    const imageFile = event.target.files;
    if (imageFile) {
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
              const newEditorState = insertImage(editorState, result.data);
              setEditorState(newEditorState);
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
  };
  // console.log(match);
  const handleSubmit = async event => {
    const titleValid = Boolean(title);
    if (!titleValid) {
      setTitleError(true);
      return false;
    }
    setTitleError(false);
    const content = stateToHTML(editorState.getCurrentContent());
    const contnetValid = Boolean(content);
    if (!contnetValid) {
      setContentError(true);
      return false;
    }
    if (content === '<p><br></p>') {
      setContentError(true);
      return false;
    }
    setContentError(false);
    if (match.params.boardType === 'GALLERY') {
      if (!content.includes('<img')) {
        setContentImageError(true);
        return false;
      }
    }
    setContentImageError(false);
    console.log(event.target);
    let result;
    try {
      setLoading(true);
      const options = {
        method: 'POST',
        data: {
          title,
          content,
          titleHead,
          imageList,
          // boardMasterId: match.params.boardMasterId,
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
        history.push(`/board/detail/${match.params.boardId}`);
      }
    }
    return true;
  };

  const setInitData = async () => {
    try {
      setLoading(true);
      const options = {
        method: 'GET',
        // auth: true,
      };
      const result = await request(
        `/api/board/${match.params.boardId}`,
        options,
      );
      // console.log(result);
      if (result.data) {
        setBoard(result.data);
        setBoardMaster(result.data.boardMaster);
        setTitleHead(result.data.titleHead);
        setTitle(result.data.title);
        if (result.data.mediaCollections) {
          if (result.data.mediaCollections.length > 0) {
            const initData = [];
            for (let i = 0; i < result.data.mediaCollections.length; i += 1) {
              initData.push(result.data.mediaCollections[i].fullPath);
            }
            setImageList(initData);
          }
        }

        const state = stateFromHTML(result.data.content);
        // const blocksFromHTML = convertFromHTML(result.data.content);
        // const state = ContentState.createFromBlockArray(
        //   blocksFromHTML.contentBlocks,
        //   blocksFromHTML.entityMap,
        // );
        setEditorState(EditorState.createWithContent(state));

        // const editorStateEx = EditorState.createWithContent(
        //   convertFromHTML(result.data.content),
        // );

        // setEditorState(editorStateEx);
        // setEditorState(result.data.content);
        // setEditorState(state);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = index => {
    // console.log(index);
    const newContents = JSON.parse(JSON.stringify(imageList));
    newContents.splice(index, 1);
    setImageList(newContents);
  };

  if (!isSignin) {
    return <SigninRequired />;
  }

  if (matches) {
    return (
      <BoardPutMobile
        match={match}
        history={history}
        isSignin={isSignin}
        boardMaster={boardMaster}
        board={board}
      />
    );
  }
  return (
    <div>
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
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
        <Grid
          container
          justify="flex-start"
          alignItems="center"
          className={classes.grid}
        >
          <InlineStyleControls
            editorState={editorState}
            onToggle={toggleInlineStyle}
          />
          <div>
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
                // onClick={handleImagePop}
              >
                <PhotoCamera />
              </Button>
            </label>
            <Button
              variant="contained"
              color="default"
              component="span"
              className={classes.buttonEditor}
              onClick={handleImagePop}
            >
              <PhotoAlbum />
            </Button>
          </div>
        </Grid>
        <div
          role="presentation"
          onClick={focusEditor}
          className={classNames(className, classes.editorWrap)}
        >
          {loading && <LinearProgress />}
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={mapKeyToEditorCommand}
            // placeholder="내용을 입력해 주세요."
            ref={editor}
            spellCheck
            editorState={editorState}
            onChange={editorStates => setEditorState(editorStates)}
            plugins={plugins}
          />
          {loading && <LinearProgress />}
        </div>
        {contentError && (
          <p className={classes.imageLinkError}>※ 내용을 입력해 주세요.</p>
        )}
        {contentImageError && (
          <p className={classes.imageLinkError}>※ 이미지를 첨부시켜주세요.</p>
        )}
        {/* <button onClick={handleClick}>Insert an image</button> */}
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
        <Dialog
          open={imagePop}
          onClose={handleImagePopClose}
          aria-labelledby="simple-dialog-image"
        >
          {/* <EditorImageUploadPop handleClose={handleImagePopClose} /> */}
          <DialogTitle id="alert-dialog-title">
            {'이미지 링크를 입력해 주세요'}
          </DialogTitle>
          <DialogContent>
            <input
              type="text"
              className={classes.inputLink}
              maxLength="200"
              max="200"
              placeholder="https://"
              onChange={e => setImageLink(e.target.value)}
              value={imageLink}
            />

            {imageLinkError && (
              <p className={classes.imageLinkError}>
                ※ &apos;http://&apos; 또는 &apos;https://&apos; 로 시작해야
                합니다.
              </p>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleImagePopClose} color="primary">
              취소
            </Button>
            <Button onClick={handleImagePopSubmit} color="primary" autoFocus>
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

BoardPutPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  match: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
  isSignin: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  boardPutPage: makeSelectBoardPutPage(),
  isSignin: makeSelectSignin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BoardPutPage);

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

function StyleButton({ onToggle, active, style, label }) {
  const classes = useStyles();
  const onToggleStyle = e => {
    e.preventDefault();
    onToggle(style);
  };

  return (
    <Button
      variant="contained"
      color={active ? 'primary' : 'default'}
      className={classNames(classes.buttonEditor)}
      onMouseDown={onToggleStyle}
    >
      {label}
    </Button>
  );
}

StyleButton.propTypes = {
  onToggle: PropTypes.func,
  active: PropTypes.any,
  label: PropTypes.any,
  style: PropTypes.any,
};

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'BL', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'CB', style: 'code-block' },
];
const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

BlockStyleControls.propTypes = {
  editorState: PropTypes.any,
  onToggle: PropTypes.any,
};

const INLINE_STYLES = [
  { label: 'B(진하게)', style: 'BOLD' },
  { label: 'I(흘림체)', style: 'ITALIC' },
  { label: 'U(밑줄)', style: 'UNDERLINE' },
  { label: 'M', style: 'CODE' },
];
const InlineStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

InlineStyleControls.propTypes = {
  editorState: PropTypes.any,
  onToggle: PropTypes.func,
};
